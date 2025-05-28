import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { assignClerkToTerritory } from "../lib/territories";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

type ClerkAssignmentProps = {
  territoryId: string;
  onSuccess?: () => void;
};

export function ClerkAssignment({
  territoryId,
  onSuccess,
}: ClerkAssignmentProps) {
  const [loading, setLoading] = useState(false);
  const [selectedClerk, setSelectedClerk] = useState("");

  // const { data: clerks, isLoading } = useQuery({
  //   queryKey: ["clerks"],
  //   queryFn: async () => {
  //     const { data } = await supabase
  //       .from("users")
  //       .select("id, full_name")
  //       .eq("role_id", "clerk")
  //       .eq("active", true);
  //     return data;
  //   },
  // });

  const handleAssign = async () => {
    if (!selectedClerk) return;

    try {
      setLoading(true);
      await assignClerkToTerritory(selectedClerk, territoryId);
      toast.success("Clerk assigned successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to assign clerk");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // if (isLoading) {
  //   return <div>Loading clerks...</div>;
  // }

  return (
    <div className="space-y-4">
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Clerk
        </label>
        <select
          value={selectedClerk}
          onChange={(e) => setSelectedClerk(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a clerk</option>
          {clerks?.map((clerk:any) => (
            <option key={clerk.id} value={clerk.id}>
              {clerk.full_name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        disabled={loading || !selectedClerk}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {loading ? "Assigning..." : "Assign Clerk"}
      </button> */}
    </div>
  );
}
