import { supabase } from "@/lib/supabase";
import { Trainers } from "@/schema";

export class TrainerService {
    async getTrainers() {
        const { data, error } = await supabase.from('trainers').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as Trainers[];
    }

    async getTrainerById(id: string) {
        const { data, error } = await supabase.from('trainers').select('*').eq('id', id).single();
        if (error) throw error;
        return data as Trainers;
    }

    async createTrainer(trainer: Omit<Trainers, 'id' | 'created_at'>) {
        const { data, error } = await supabase.from('trainers').insert(trainer).select().single();
        if (error) throw error;
        return data;
    }

    async updateTrainer(id: string, trainer: Partial<Trainers>) {
        const { data, error } = await supabase.from('trainers').update(trainer).eq('id', id).select().single();
        if (error) throw error;
        return data;
    }

    async deleteTrainer(id: string) {
        const { error } = await supabase.from('trainers').delete().eq('id', id);
        if (error) throw error;
    }
}

export const trainerService = new TrainerService();
