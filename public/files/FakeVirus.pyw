import tkinter as tk
import random
import subprocess
import threading
import time
import winsound
from tkinter import messagebox

# --- Setup ---
root = tk.Tk()
root.title("!! SECURITY BREACH !!")
root.attributes('-fullscreen', True)
root.configure(bg="black")

progress = 0
is_typing = False
start_time = time.time()
total_duration = 15  # seconds

# --- UI ---
title_label = tk.Label(root, text="!!! SYSTEM BREACH IN PROGRESS !!!", fg="red", bg="black", font=("Courier", 28, "bold"))
title_label.pack(pady=20)

red_bar = tk.Label(root, bg="darkred", height=1)
red_bar.pack(fill="x", pady=(0, 10))

text_box = tk.Text(root, height=25, width=90, bg="black", fg="lime", insertbackground="lime", font=("Courier", 12))
text_box.pack()
text_box.insert(tk.END, ">>> Initializing breach module...\n>>> Please wait...\n\n")
text_box.config(state='normal')
text_box.focus()

progress_label = tk.Label(root, text="[ COMPLETION: 0% ]", fg="cyan", bg="black", font=("Courier", 16, "bold"))
progress_label.pack(pady=10)

hacker_type_label = tk.Label(root, text="[ REMOTE ACCESS INTRUSION ]", fg="orange", bg="black", font=("Courier", 14, "italic"))
hacker_type_label.place(relx=1.0, y=5, anchor="ne")

# --- Data ---
hacker_tags = ["BLACK HAT - LEVEL 7", "SIGINT NODE: ALPHA-9", "REMOTE ACCESS INTRUSION", "ACCESS LEVEL: ROOT"]
fake_data_templates = [
    "IP Address: 192.168.{0}.{1}", "SSID: Backdoor_WiFi_{0}",
    "MAC Address: 00:1B:44:{0:02X}:{1:02X}:{2:02X}", "Token: x9F{0}K7{1}Z1{2}",
    "Admin Login: root@192.168.{0}.{1}"
]
fake_commands = [
    "cd C:\\System32\\Exploit", "python virus.py --silent",
    "start delete.exe", "echo Erasing boot sector...",
    "net use \\\\192.168.0.{0}\\C$ /user:admin hacked"
]

# --- Progress Logic ---
def update_progress():
    global progress
    elapsed = time.time() - start_time
    progress = min(int((elapsed / total_duration) * 100), 100)
    progress_label.config(text=f"[ COMPLETION: {progress}% ]")
    if progress < 100:
        root.after(200, update_progress)
    else:
        text_box.insert(tk.END, "\n[ DELETING SYSTEM FILES... ]\n")
        root.after(1000, trigger_blackout)  # Trigger blackout after the message

def cycle_hacker_type():
    if progress < 100:
        hacker_type_label.config(text=f"[ {random.choice(hacker_tags)} ]")
        root.after(4000, cycle_hacker_type)

def shutdown_computer():
    try:
        subprocess.run("shutdown /s /t 0", shell=True)
    except Exception as e:
        messagebox.showerror("Error", f"Could not shut down: {e}")


def generate_fake_data():
    if progress < 100:
        for _ in range(2):
            tmpl = random.choice(fake_data_templates)
            line = tmpl.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            text_box.insert(tk.END, f"{line}\n")
            text_box.see(tk.END)
        root.after(300, generate_fake_data)

def type_command(line, index=0):
    global is_typing
    is_typing = True
    if index < len(line):
        text_box.insert(tk.END, line[index])
        text_box.see(tk.END)
        root.after(20, lambda: type_command(line, index + 1))
    else:
        text_box.insert(tk.END, "\n")
        is_typing = False
        if progress < 100:
            root.after(500, type_next_command)

def type_next_command():
    if not is_typing and progress < 100:
        cmd = random.choice(fake_commands).format(random.randint(0, 255))
        type_command(f"> {cmd}")

def beep():
    if progress < 100:
        winsound.MessageBeep(winsound.MB_ICONHAND)
        root.after(random.randint(1000, 3000), beep)

def spawn_fake_error():
    if progress < 100 and random.random() < 0.3:
        messagebox.showerror("Windows Error", "Critical process failed.")
    root.after(random.randint(2500, 4500), spawn_fake_error)

def launch_fake_cmd():
    try:
        p = subprocess.Popen(['cmd', '/c', 'echo ERROR && dir'], creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(random.uniform(0.5, 1.5))
        p.terminate()
    except:
        pass

def spawn_cmd_windows():
    if progress < 100 and random.random() < 0.5:
        threading.Thread(target=launch_fake_cmd).start()
    root.after(random.randint(500, 1000), spawn_cmd_windows)

# --- Recovery Screens ---
def show_fake_repair():
    repair = tk.Toplevel()
    repair.attributes("-fullscreen", True)
    repair.overrideredirect(True)
    repair.configure(bg="black")

    msg = (
        "\nWindows Recovery\n\n"
        "Automatic Repair couldn't repair your PC\n"
        "Press 'Advanced options' to try other options to repair your PC\n"
        "or 'Shut down' to turn off your PC.\n\n"
        "Log file: C:\\Windows\\System32\\Logfiles\\Srt\\SrtTrail.txt"
    )

    label = tk.Label(repair, text=msg, font=("Courier", 16), fg="white", bg="black", justify="left")
    label.pack(pady=100)

    btn_frame = tk.Frame(repair, bg="black")
    btn_frame.pack()

    tk.Button(btn_frame, text="Shut Down", font=("Courier", 14), width=15, command=shutdown_computer).pack(side="left", padx=40)
    tk.Button(btn_frame, text="Advanced Options", font=("Courier", 14), width=20, command=show_fake_recovery).pack(side="left", padx=40)

def show_fake_recovery():
    recovery = tk.Toplevel()
    recovery.attributes("-fullscreen", True)
    recovery.overrideredirect(True)
    recovery.configure(bg="black")

    # BIOS-style cursor
    recovery.config(cursor="none")  # Hides cursor during recovery

    label = tk.Label(recovery, text="Recovery Options\n\nWould you like to recover your PC?", font=("Courier", 20), fg="white", bg="black")
    label.pack(pady=100)

    btn = tk.Button(recovery, text="Continue", font=("Courier", 14), width=20, command=lambda: start_recovery(recovery))
    btn.pack(pady=20)

def start_recovery(win):
    win.destroy()
    recovering = tk.Toplevel()
    recovering.attributes("-fullscreen", True)
    recovering.overrideredirect(True)
    recovering.configure(bg="black")

    label = tk.Label(recovering, text="Recovering your PC...", font=("Courier", 20), fg="white", bg="black")
    label.pack(pady=50)

    canvas = tk.Canvas(recovering, width=600, height=30, bg="gray")
    canvas.pack()
    bar = canvas.create_rectangle(0, 0, 0, 30, fill="lime")

    def slowly_fill_bar(i=0):
        if i <= 600:
            canvas.coords(bar, 0, 0, i, 30)
            recovering.after(500, slowly_fill_bar, i + 2)  # Very slow fill
        else:
            # Loop indefinitely
            recovering.after(5000, lambda: slowly_fill_bar(0))

    slowly_fill_bar()

def trigger_blackout():
    # Hide all widgets and the mouse cursor to prepare for blackout
    for widget in root.winfo_children():
        widget.pack_forget()

    # Remove hacker tag explicitly
    hacker_type_label.place_forget()

    root.configure(bg="black")
    root.config(cursor="none")  # Hide the cursor during blackout

    root.after(3000, show_fake_repair)  # Show recovery screen after 3 seconds blackout

# --- Event Blockers ---
def on_key_press(event):
    if not is_typing:
        text_box.insert(tk.END, event.char)

def on_closing():
    pass

def on_ctrl_shift_escape(event):
    if event.state == 12 and event.keysym == 'Escape':  # Ctrl+Shift+Esc
        messagebox.showinfo("Security Breach", "Breach terminated!")
        root.quit()

root.protocol("WM_DELETE_WINDOW", on_closing)
root.bind("<Key>", on_key_press)
root.bind("<KeyPress>", on_ctrl_shift_escape)

# --- GO! ---
update_progress()
generate_fake_data()
cycle_hacker_type()
type_next_command()
beep()
spawn_cmd_windows()
spawn_fake_error()

root.mainloop()
