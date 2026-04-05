import { NextRequest, NextResponse } from 'next/server';

interface CalorieRequest {
  type: 'food' | 'workout';
  item: string;
  quantity: string;
}

interface CalorieResponse {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  duration?: number;
  intensity?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CalorieRequest = await request.json();
    
    const { type, item, quantity } = body;

    // Validate input
    if (!type || !item?.trim() || !quantity?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: type, item, quantity' },
        { status: 400 }
      );
    }

    if (!['food', 'workout'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "food" or "workout"' },
        { status: 400 }
      );
    }

    // Get OpenRouter API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Create prompt based on type
    const prompt = type === 'food' 
      ? `Calculate the calories for this food item: ${item} with quantity: ${quantity}. 
         The quantity may include units like kg, g, l, ml, cups, tablespoons, etc. Parse the quantity correctly.
         Return a JSON response with:
         - calories: total calories (number)
         - protein: grams of protein (number)
         - carbs: grams of carbohydrates (number)  
         - fat: grams of fat (number)
         Only return the JSON object, no additional text.`
      : `Calculate the calories burned for this exercise: ${item} performed ${quantity}.
         The quantity is already formatted as "X sets of Y reps" or similar format.
         Return a JSON response with:
         - calories: total calories burned (number)
         - duration: estimated duration in minutes (number)
         - intensity: intensity level (low/medium/high)
         Only return the JSON object, no additional text.`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to calculate calories', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Could not parse AI response:', aiResponse);
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      );
    }
    
    const parsedData: CalorieResponse = JSON.parse(jsonMatch[0]);
    
    // Validate parsed data
    if (typeof parsedData.calories !== 'number' || parsedData.calories < 0) {
      return NextResponse.json(
        { error: 'Invalid calorie value returned' },
        { status: 500 }
      );
    }

    // Log the result for debugging
    console.log('Calorie calculation result:', {
      type,
      item,
      quantity,
      result: parsedData
    });

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error('Calorie calculation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
