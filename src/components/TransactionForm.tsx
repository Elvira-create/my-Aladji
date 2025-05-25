import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTransaction } from '../lib/transactions';
import toast from 'react-hot-toast';

const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['deposit', 'withdrawal']),
  payment_method: z.enum(['cash', 'check', 'transfer']),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

type TransactionFormProps = {
  accountId: string;
  clerkId: string;
  onSuccess?: () => void;
};

export function TransactionForm({ accountId, clerkId, onSuccess }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = async (data: TransactionFormData) => {
    try {
      setLoading(true);
      await createTransaction({
        account_id: accountId,
        clerk_id: clerkId,
        ...data,
        status: 'pending',
      });
      toast.success('Transaction created successfully');
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create transaction');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          {...register('payment_method')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="transfer">Transfer</option>
        </select>
        {errors.payment_method && (
          <p className="mt-1 text-sm text-red-600">{errors.payment_method.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Creating...' : 'Create Transaction'}
      </button>
    </form>
  );
}