from playwright.sync_api import sync_playwright, Page, expect

def verify_revamp(page: Page):
    """
    This script verifies the new design of the resume website.
    It navigates to the local server, waits for the page to load,
    and takes a full-page screenshot.
    """
    # Navigate to the local server
    page.goto("http://localhost:4321/resume/")

    # Wait for the hero section to be visible
    expect(page.get_by_role("heading", name="Sudeep G")).to_be_visible()

    # Wait for the page to be fully loaded, including animations
    page.wait_for_timeout(2000) # 2 seconds wait for animations to settle

    # Take a screenshot of the full page
    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_revamp(page)
        browser.close()

if __name__ == "__main__":
    main()
