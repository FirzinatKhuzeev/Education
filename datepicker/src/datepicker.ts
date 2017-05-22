import { IDatePicker } from "./idatepickerinterface";
import "./css/datepicker.css";

export class DatePicker implements IDatePicker {

    private input: HTMLInputElement;
    private calendar: HTMLElement;
    private year: number;
    private month: number;
    private now: Date;
    private today: Date;
    private days: Array<string> = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    private months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    constructor(element: HTMLInputElement) {

        this.input = element;
        this.now = new Date();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();
        this.today = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        this.calendar = document.createElement("div");
        this.calendar.classList.add("datepicker");
        this.calendar.classList.add("hide");
        this.input.parentNode.insertBefore(this.calendar, this.input.nextSibling);
        this.render();
        this.init();
    }

    private init(): void {
        this.onInput();
        this.onDateClick();
        this.onOutsideClick();
    }

    render(): void {
        let date = new Date(this.year, this.month);
        this.month = date.getMonth();
        this.year = date.getFullYear();

        let table =
            `<table>
                <caption>
                <button class="prev">&larr;</button>
                <span>${this.months[this.month]} ${this.year}</span>
                <button class="next">&rarr;</button>
            </caption>`;

        [].forEach.call(this.days, (day: string) => {
            table += `<th>${day}</th>`;
        });

        table += `</tr><tr>`;

        for (let i = 0; i < this.GetDayNumber(date); i++) {
            table += `<td></td>`;
        }

        while (date.getMonth() === this.month) {
            let monthSection = "";

            if (date.valueOf() < this.today.valueOf()) {
                monthSection = "class='unavailable'";
            }

            if (date.valueOf() === this.today.valueOf()) {
                monthSection = "class='today'";
            }

            table += `<td ${monthSection} > ${date.getDate()}</td>`;

            if (this.GetDayNumber(date) % 7 === 6) {
                table += `</tr><tr>`;
            }

            date.setDate(date.getDate() + 1);
        }

        if (this.GetDayNumber(date) !== 0) {
            for (let i = this.GetDayNumber(date); i < 7; i++) {
                table += `<td></td>`;
            }
        }

        table += `</tr></table>`;
        this.calendar.innerHTML = table;
    };

    show(): void {
        this.calendar.classList.toggle("hide");
    };

    hide(): void {
        if (!this.calendar.classList.contains("hide")) {
            this.calendar.classList.toggle("hide");
        }
    }

    private onInput(): void {
        this.input.addEventListener("click", (e: Event) => {
            e.stopPropagation();
            let top = this.input.offsetTop;
            let left = this.input.offsetLeft;
            let height = this.input.offsetHeight;
            this.input.style.top = (top + height) + "px";
            this.calendar.style.left = left + "px";
            this.show();
        });
    }

    private onDateClick(): void {
        this.calendar.addEventListener("click", (e: Event) => {
            e.stopPropagation();
            let target = <HTMLElement>(e.target || e.srcElement);

            if (target.tagName.toLowerCase() === "td" && parseInt(target.innerHTML)) {
                this.input.value = this.GetFullDate(parseInt(target.innerHTML));
                this.hide();
            }

            if (target.classList.contains("next")) {
                this.month++;
                this.render();
            }

            if (target.classList.contains("prev")) {
                this.month--;
                this.render();
            }
        });
    }

    private onOutsideClick(): void {
        document.addEventListener("click", () => {
            this.hide();
        });
    }

    private GetFullDate(date: number): string {
        return new Date(this.year, this.month, date).toDateString();
    }

    private GetDayNumber(date: Date): number {
        let dayNumber = date.getDay();
        if (dayNumber === 0) {
            dayNumber = 7;
        };

        return dayNumber - 1;
    }
}

window.onload = () => {
    let inputs = document.querySelectorAll("input[data-control=datepicker]");
    [].forEach.call(inputs, function (input: HTMLInputElement) {
        new DatePicker(input);
    });
};
