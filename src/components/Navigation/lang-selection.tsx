import LanguageSelection from "./language"

function Language() {
    const handleLanguageSelect = (language: string) => {
        console.log("Selected language:", language)
        // Handle language selection logic here
    }

    const handleBack = () => {
        console.log("Back button clicked")
        // Handle back navigation here
    }

    const handleMenuClick = () => {
        console.log("Menu button clicked")
        // Handle menu opening here
    }

    const handleNotificationClick = () => {
        console.log("Notification button clicked")
        // Handle notification panel here
    }

    return (
        <div className="App">
            <LanguageSelection
                onLanguageSelect={handleLanguageSelect}
                onBack={handleBack}
                onMenuClick={handleMenuClick}
                onNotificationClick={handleNotificationClick}
            />
        </div>
    )
}

export default Language
