


import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scan_csrf(url):
    print(f"[+] Scanning URL: {url}\n")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    forms = soup.find_all("form")
    report = []

    print(f"[+] Found {len(forms)} forms\n")

    for index, form in enumerate(forms, start=1):
        action = form.get("action")
        method = form.get("method", "GET").upper()

        inputs = form.find_all("input")
        csrf_found = False

        for inp in inputs:
            name = inp.get("name", "").lower()
            if "csrf" in name or "token" in name:
                csrf_found = True

        if not csrf_found:
            target = urljoin(url, action)
            print(f"[!] Form {index} is missing CSRF token")
            print(f"    Action: {target}")
            print(f"    Method: {method}\n")

            report.append(
                f"Form {index} | Action: {target} | Method: {method} | CSRF Token: Missing"
            )

    with open("report.txt", "w") as file:
        for line in report:
            file.write(line + "\n")

    print("[+] Scan complete. Results saved to report.txt")

if __name__ == "__main__":
    target_url = input("Enter target URL: ")
    scan_csrf(target_url)
