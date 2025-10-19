import { useState, useEffect } from 'react';
import type { Client } from '@/types';
import { getClients } from '../firebase/firestore';

// This hook would provide an easy way to interact with Firestore collections.

// Example hook to fetch clients for the current organization
export function useClients(organizationId: string) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!organizationId) return;

    async function fetchClients() {
      try {
        setLoading(true);
        const fetchedClients = await getClients(organizationId);
        setClients(fetchedClients);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, [organizationId]);

  return { clients, loading, error };
}
