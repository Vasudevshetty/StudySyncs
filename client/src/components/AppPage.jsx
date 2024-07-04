function AppPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg flex items-center ">
          <img src="/img/syncs-final.png" alt="" className="h-10" />
          <span className="pl-2">StudySyncs</span>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-500 px-4 py-2 rounded">Sign In</button>
          <button className="bg-green-500 px-4 py-2 rounded">Sign Up</button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-200 p-4">
          <div className="mb-4">Tree</div>
          <ul className="space-y-2">
            <li>Course 1</li>
            <li>Course 2</li>
            <li>Course 3</li>
            <li>Course 4</li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl mb-4">College Name</h1>
          <section className="mb-4">
            <h2 className="text-xl">Courses Offered</h2>
            <ul className="space-y-2">
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
              <li>Course 4</li>
            </ul>
          </section>

          {/* Lower Section */}
          <div className="flex space-x-4">
            <div className="w-1/2 p-4 bg-gray-100">About</div>
            <div className="w-1/2 p-4 bg-gray-100">
              <div className="mb-2">Quick Links</div>
              <ul className="space-y-2">
                <li>CS</li>
                <li>IT</li>
                <li>UK</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppPage;
