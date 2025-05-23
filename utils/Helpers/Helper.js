import { BiSolidBookReader } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import queryString from "query-string";
import useSessionUser from "@/stores/useSessionsAuthStore";
import {
  FcVideoFile,
  FcConferenceCall,
  FcDocument,
  FcLink,
  FcSurvey,
  FcAudioFile,
} from "react-icons/fc";
import moment from "moment";

export function array_column(arr, columnKey) {
  return arr.map(function (row) {
    return row[columnKey];
  });
}

export function parseHtml(str) {
  str?.replace(/&nbsp;/g, " ");
  return str?.replace(/<[^>]+>/g, "");
}

export function excerpt(str, limit) {
  return str?.length > limit ? str?.slice(0, limit) + "..." : str;
}

export function dateFormatToID(date, withTime = false) {
  if (withTime)
    return new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",

      hour: "numeric",
      minute: "numeric",
    });
  else
    return new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}

export const imageBase64 = (file, setPhotos, type, data) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    if (type)
      setPhotos({
        ...data,
        [type]: reader.result,
      });
    else setPhotos(reader.result);
    return reader.result;
  };

  return file;
};

export const imageBase64Call = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    callback(reader.result);
    return reader.result;
  };

  return file;
};

export const typePopUp = (type) => {
  switch (type) {
    case 1:
      return "Foto";
    case 2:
      return "Judul & Content";
    case 3:
      return "Judul & Content & Foto";
  }
};

export const typeInformation = (type) => {
  switch (type) {
    case 1:
      return "Foto";
    case 2:
      return "Judul & Content";
    case 3:
      return "Judul & Content & Foto";
  }
};

export const categoryInformation = (category) => {
  switch (category) {
    case 1:
      return "Pengumuman";
    case 2:
      return "Informasi Keamanan Kerja";
    case 3:
      return "Informasi Umum";
  }
};

export const iconCase = (type, className) => {
  switch (type) {
    case "informasi-kelas":
      return <BiSolidBookReader className={className} />;
    case "anggota-kelas":
      return <PiStudentBold className={className} />;
    case "pengajar":
      return <FaChalkboardTeacher className={className} />;
    case "materi":
      return <HiDocumentText className={className} />;
  }
};

export const formatSnakeCase = (str) => {
  return (
    str &&
    str
      .replace(/_/g, " ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  );
};

export const parsePermissionName = (str) => {
  let split = str.split(".");
  let result = "";

  split.forEach((item, index) => {
    if (index === 0) {
      result += formatSnakeCase(item);
    } else {
      if (item !== "index" && item !== "create")
        result += " " + formatSnakeCase(item);
    }
  });

  return result;
};

export const typeSessionMateri = (type) => {
  switch (type) {
    case "offline-class":
      return "Kelas Offline";
    case "online-class":
      return "Kelas Online";
    case "virtual-class":
      return "Kelas Virtual";
  }
};

export const typeMateriAdd = (type) => {
  switch (type) {
    case "link-meet":
      return "Link Meet Online";
    case "description":
      return "Deskripsi";
    case "document":
      return "Dokumen";
    case "video":
      return "Video";
    case "link":
      return "Link";
    case "audio":
      return "Audio";
    default:
      return "";
  }
};

export const buildUrl = ({ baseUrl, query }) => {
  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: query,
    },
    {
      arrayFormat: "comma",
      skipEmptyString: true,
    }
  );
};

export const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

export const extensionFile = (file) => {
  let extension = file?.split(".");
  return extension[extension?.length - 1];
};

export const iconFile = (extention, height, width, filePath) => {
  let src;
  switch (extention) {
    case "pdf":
      src = "/assets/icons/icons-pdf-blue.svg";
      break;
    case "doc":
    case "docx":
      src = "/assets/icons/icon-doc-blue.svg";
      break;
    case "xls":
    case "xlsx":
      src = "/assets/icons/icon-xls-blue.svg";
      break;
    case "csv":
      src = "/assets/icons/icon-csv-blue.svg";
      break;
    case "ppt":
    case "pptx":
      src = "/assets/icons/icon-ppt-blue.svg";
      break;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      if (filePath) {
        src = `/placeholder.png${filePath}`;
        height = 80;
        width = 80;
      } else src = "/assets/icons/icon-image-blue.svg";
      break;
    case "mp4":
    case "mkv":
    case "avi":
    case "mov":
      // if (filePath) {
      //   return (
      //     <video
      //       src={`/placeholder.png${filePath}`}
      //       height={100}
      //       width={100}
      //       controls
      //     />
      //   );
      // } else
      src = "/assets/icons/icon-video-blue.svg";
      break;
    case "mp3":
    case "wav":
      src = "/assets/icons/icon-audio-blue.svg";
      break;
    default:
      src = "/assets/icons/icon-document-blue.svg";
      break;
  }

  return <img src={src} height={height} width={width} />;
};

export const ucfirst = (inputString) => {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

export const iconMateri = (type, size, className) => {
  switch (type) {
    case "link-meet":
      return <FcConferenceCall className={className} size={size} />;
    case "description":
      return <FcSurvey className={className} size={size} />;
    case "document":
      return <FcDocument className={className} size={size} />;
    case "video":
      return <FcVideoFile className={className} size={size} />;
    case "link":
      return <FcLink className={className} size={size} />;
    case "audio":
      return <FcAudioFile className={className} size={size} />;
  }
};

export const convertDuration = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours > 0) {
    return `${hours} jam ${minutes} menit`;
  } else if (minutes > 0) {
    return `${minutes} menit ${seconds} detik`;
  } else {
    return `${seconds} detik`;
  }
};

export const convertDurationToSeconds = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  return totalSeconds;
};

// create parser form For Impovment to for-improvment
export const parserStringToSlug = (str) => {
  return str?.split(" ").join("-").toLowerCase();
};

export const alphabetIndex = (index) => {
  const abjad = "abcdefghijklmnopqrstuvwxyz".split("")?.[index];
  return abjad;
};

export const badgeStatusDate = (start_at, end_at) => {
  let name = "";
  let background = "";
  const dateNow = moment().format();
  const dateStartAt = moment(start_at).format();
  const dateEndAt = moment(end_at).format();
  if (dateNow > dateStartAt && dateNow < dateEndAt) {
    name = "Berlangsung";
    background = "bg-p-green";
  } else if (dateNow < dateStartAt && dateNow < dateEndAt) {
    name = "Belum Dimulai";
    background = "bg-p-yellow";
  } else {
    name = "Berakhir";
    background = "bg-p-red";
  }

  return {
    name,
    background,
  };
};

export const decodeFieldShortcode =  (teks) => {
  let shortcodes = {};
  listFieldCertificate.forEach((item) => {
    let result
    switch(item) {
      case 'Nama Peserta' :
        result = "Reihan Andika Abdipraja Makmur";
        break;
      case 'Nama Pelatihan' :
        result = `Nama Pelatihan`;
        break;
      default :
        result = '';
        break;
    }
    shortcodes[`{${item}}`] = result;
  });

  for (let shortcode in shortcodes) {
      let pengganti = shortcodes[shortcode];
      let regex = new RegExp(escapeRegExp(shortcode), "g");
      teks = teks.replace(regex, pengganti);
  }
  return teks;
}

export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const listFieldCertificate = [
  "Periode Akademik",
  "Nama Pelatihan",
  "Nama Peserta",
  "NIP Peserta",
  "Email Peserta",
  "Jabatan Peserta",
  "Peran Peserta",
  "Departemen Peserta",
  "Location Peserta",
  "Branch Peserta",
  "Section Peserta",
  "Sub Section Peserta",
];


export const getRandomDate = () => {
  const date = new Date(2024, 7, 17); // Tanggal tetap (17 Agustus 2024)
  return date.toLocaleDateString('id-ID');
};

export const getRandomTime = (startHour, endHour) => {
  const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}`;
};

export const getRandomPurpose = () => {
  const purposes = [
    'Bertemu Direktur',
    'Meeting Bulanan',
    'Diskusi Proyek',
    'Panggilan Interview',
    'Kerjasama Perusahaan',
    'Diskusi Singkat',
    'Makan Bersama'
  ];
  return purposes[Math.floor(Math.random() * purposes.length)];
};

export const getStatus = () => {
  return Math.random() > 0.5 ? 'Berkunjung' : 'Selesai';
};

export const getStatusEmployee = () => {
  return Math.random() > 0.5 ? 'Aktif' : 'Tidak Aktif';
};

export const calculateDuration = (dateCheckIn, dateCheckOut) => {
  if (!dateCheckIn || !dateCheckOut) return "";

  // Convert date strings into Date objects
  const checkInDate = new Date(dateCheckIn);
  const checkOutDate = new Date(dateCheckOut);

  // Check for invalid dates
  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    return "Invalid date format";
  }

  // Calculate the difference in milliseconds
  const diffMs = checkOutDate - checkInDate;

  // Convert the difference to hours and minutes
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format the duration as "X hours, Y minutes"
  let duration = "";
  if (hours > 0) duration += `${hours} hours`;
  if (minutes > 0) duration += `${hours > 0 ? ", " : ""}${minutes} minutes`;
  if (!duration) duration = "Less than 1 minute";

  return duration;
};

export const isCan = (permission) => {
  const { sessionUser } = useSessionUser();

  let isCan = false;
  if (sessionUser?.user?.roles && sessionUser?.user?.roles.length) {
    for (let index = 0; index < sessionUser?.user?.roles?.length; index++) {
        if (sessionUser?.user?.roles[index]?.permissions && sessionUser?.user?.roles[index]?.permissions.length) {
            for (let i = 0; i < sessionUser?.user?.roles[index]?.permissions.length; i++) {
                if (sessionUser?.user?.roles[index]?.permissions[i].name == permission) {
                    isCan = true;
                }
            }
        }
    }
  }
  return isCan;
};
