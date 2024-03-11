import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://pqqkqwuhrxyywtauqcks.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcWtxd3Vocnh5eXd0YXVxY2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxODA1NzQsImV4cCI6MjAyNTc1NjU3NH0.xCCwb8bK8H6J62EWFWLLdNSWC6ge2jbojB2n04x7nn0'
export const supabase = createClient(supabaseUrl, supabaseKey);

