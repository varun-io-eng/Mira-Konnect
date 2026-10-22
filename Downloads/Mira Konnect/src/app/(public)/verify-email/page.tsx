import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/actions/verify-email";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Invalid Link</h1>
          <p className="mt-2 text-gray-600">This verification link is invalid.</p>
        </div>
      </div>
    );
  }

  const result = await verifyEmailAction(token);

  if (!result.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Verification Failed</h1>
          <p className="mt-2 text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  // Success - redirect happens in the action
  redirect("/");
}
