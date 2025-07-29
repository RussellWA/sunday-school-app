export function getClassFromDOB(dob: string): string {
    const birthDate = new Date(dob);
    const today = new Date();

    const age =
        today.getFullYear() -
        birthDate.getFullYear() -
        (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    if (age >= 0 && age <= 3) return "0-3 y/o";
    if (age === 4 || age === 5) return "4-5 y/o";
    if (age === 6 || age === 7) return "6-7 y/o";
    if (age >= 8 && age <= 9) return "8-9 y/o";
    else return "Teens";
}
