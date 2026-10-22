"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CareerOnboardingModal } from "@/components/jobs/career-onboarding-modal";
import { FIND_JOB_QUERY, FIND_JOB_VALUE, MATCHED_QUERY, MATCHED_VALUE } from "@/lib/find-job";

type JobsFindFlowProps = {
  isLoggedInCandidate: boolean;
  onboardingComplete: boolean;
  defaultName?: string;
  defaultPhone?: string;
  searchQuery?: string;
  searchLocation?: string;
  children: React.ReactNode;
};

export function JobsFindFlow({
  isLoggedInCandidate,
  onboardingComplete,
  defaultName,
  defaultPhone,
  searchQuery,
  searchLocation,
  children,
}: JobsFindFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const findMode = searchParams.get(FIND_JOB_QUERY) === FIND_JOB_VALUE;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!findMode) {
      setModalOpen(false);
      return;
    }
    if (!isLoggedInCandidate) {
      return;
    }
    if (!onboardingComplete) {
      setModalOpen(true);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete(FIND_JOB_QUERY);
    params.set(MATCHED_QUERY, MATCHED_VALUE);
    const qs = params.toString();
    router.replace(`/jobs?${qs}`);
    setModalOpen(false);
  }, [findMode, isLoggedInCandidate, onboardingComplete, router, searchParams]);

  const clearFindQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(FIND_JOB_QUERY);
    params.set(MATCHED_QUERY, MATCHED_VALUE);
    const qs = params.toString();
    router.replace(`/jobs?${qs}`);
    setModalOpen(false);
  }, [router, searchParams]);

  const handleComplete = useCallback(() => {
    clearFindQuery();
    router.refresh();
  }, [clearFindQuery, router]);

  return (
    <>
      {children}
      {isLoggedInCandidate ? (
        <CareerOnboardingModal
          open={modalOpen}
          defaultName={defaultName}
          defaultPhone={defaultPhone}
          defaultCurrentLocation={searchLocation}
          defaultPreferredLocation={searchLocation}
          defaultJobFunctionQuery={searchQuery}
          onComplete={handleComplete}
        />
      ) : null}
    </>
  );
}
