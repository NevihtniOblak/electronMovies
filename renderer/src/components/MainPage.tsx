function MainPage() {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <button onClick={() => window.electronAPI.openSettings()}>Open Settings</button>
        </div>
    );
}

export default MainPage;
