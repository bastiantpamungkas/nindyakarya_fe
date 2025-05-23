const INDICATOR = {
    'max_absence': 'Maximal Mangkir Absen',
    'grade_final_score': 'Nilai Ujian Akhir',
    'grade_final_exam': 'Nilai Akhir Ujian',
}

export function getIndicator(indicator) {
    return INDICATOR[indicator]
}

export function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowerCase(string) {
    return string.toLowerCase();
}
