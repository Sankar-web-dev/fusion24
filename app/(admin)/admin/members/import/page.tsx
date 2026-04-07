'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Outfit } from 'next/font/google';
import * as XLSX from 'xlsx';
import { bulkImportMembers } from './_actions/bulk-import-action';

const outfit = Outfit({ subsets: ['latin'] });

export default function ImportMembersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{ 
      Name: "Jadheja", 
      Email: "jadeja@example.com", 
      Phone: "1223567890",
      "Plan Name": "Yearly Plan",
      "Trainer Name": "Arun Kumar",
      "Payment Status": "paid",
      "Payment Amount": 1500,
      "Billing Start": "2026-05-01",
      "Billing End": "2026-06-01",
      "Paid Date": "2026-05-01",
      "Joined Date": "2026-05-01"
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MembersTemplate");
    XLSX.writeFile(wb, "Member_Import_Template.xlsx");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setResults(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        // Map column names to desired keys
        const formattedData = jsonData.map(row => ({
          name: row.Name || row.name || '',
          email: row.Email || row.email || '',
          phone: row.Phone || row.phone ? String(row.Phone || row.phone) : '',
          planName: row["Plan Name"] || row.PlanName || row.planName || '',
          trainerName: row["Trainer Name"] || row.TrainerName || row.trainerName || '',
          paymentStatus: row["Payment Status"] || row.PaymentStatus || row.paymentStatus || '',
          paymentAmount: row["Payment Amount"] || row.PaymentAmount || row.paymentAmount || 0,
          billingStart: row["Billing Start"] || row.BillingStart || row.billingStart || '',
          billingEnd: row["Billing End"] || row.BillingEnd || row.billingEnd || '',
          paidDate: row["Paid Date"] || row.PaidDate || row.paidDate || '',
          joinedDate: row["Joined Date"] || row.JoinedDate || row.joinedDate || '',
        })).filter(row => row.name && row.email);

        if (formattedData.length === 0) {
          toast.error("No valid data found. Ensure Name and Email columns exist.");
          setIsLoading(false);
          return;
        }

        const response = await bulkImportMembers(formattedData);
        const importedCount = response.count || 0;
        const uploadErrors = response.errors || [];
        
        if (response.success) {
          if (importedCount > 0) {
            toast.success(`Successfully imported ${importedCount} members!`);
          } else if (uploadErrors.length > 0) {
            toast.error(`Import failed. ${uploadErrors.length} errors encountered.`);
          } else {
            toast.info(`Processed successfully but no members were added.`);
          }
          setResults({ success: importedCount, errors: uploadErrors });
        } else {
          toast.error(response.error || 'Failed to import members');
        }
      } catch (err: any) {
        toast.error(`Error parsing file: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] text-slate-200 ${outfit.className}`}>
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <Link href="/admin/members">
          <Button variant="ghost" className="mb-6 hover:bg-slate-800/50 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Members
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-orange-500 rounded-full" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Import Members</h1>
        </div>

        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800/80 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
            <div className="flex-1 w-full">
              <h2 className="text-xl font-semibold text-white mb-4">1. Download Template</h2>
              <p className="text-slate-400 mb-4">
                Download the exact Excel template format. Fill it out with your members' details, but do not change the column headers.
              </p>
              <Button 
                onClick={downloadTemplate}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-sm"
              >
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Button>
            </div>

            <div className="flex-1 w-full bg-slate-800/30 p-6 rounded-xl border border-dashed border-slate-700 h-full">
              <h2 className="text-xl font-semibold text-white mb-4">2. Upload Filled Template</h2>
              <input 
                type="file" 
                accept=".xlsx, .xls, .csv" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-orange-500/10 file:text-orange-500
                  hover:file:bg-orange-500/20 transition-all mb-6 cursor-pointer"
              />
              <Button 
                onClick={handleUpload} 
                disabled={isLoading || !file}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Importing...</>
                ) : (
                  <><Upload className="mr-2 h-4 w-4" /> Upload and Import</>
                )}
              </Button>
            </div>
          </div>
        </div>

        {results && (
          <div className="mt-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-green-500 h-6 w-6" /> Import Results
            </h3>
            <p className="text-slate-300">Successfully imported <strong className="text-white text-lg">{results.success}</strong> members.</p>
            {results.errors.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-red-400 flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4" /> Errors encountered ({results.errors.length})
                </h4>
                <ul className="list-disc pl-5 text-slate-400 space-y-1 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                  {results.errors.map((err, idx) => (
                    <li key={idx} className="text-sm">{err}</li>
                  ))}
                </ul>
              </div>
            )}
            {results.success > 0 && !results.errors.length && (
              <p className="mt-4 text-green-400 text-sm">Perfect! All rows processed successfully.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
