export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This is a simple test page to verify routing works.</p>
      <a href="/auth/signin" className="text-blue-500 underline">
        Go to Signin
      </a>
    </div>
  )
}
