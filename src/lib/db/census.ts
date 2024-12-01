import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase-client";

 export interface CensusData {
  tract_name: string;
  state_code: string;
  county_code: string;
  tract_code: string;
  population: number;
  geometry: string;
}

export const insertCensusData = async (data: CensusData): Promise<PostgrestError | null | undefined> => {
  try {
    const { data: insertedData, error } = await supabase
      .from('census_data')
      .insert(data);

    if (error) {
      console.error('Error inserting data into PostGIS:', error);
      throw error;
    }
    return insertedData;
  } catch (err) {
    console.error('Insert Error:', err);
  }
};

export const listCensusData = async () => {
  return supabase.from('census_data').select('*')
}