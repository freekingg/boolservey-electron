import { jwtDecode } from 'jwt-decode';
function parseJwt(token: any) {
    if (!token) return '';
    const decoded = jwtDecode(token);
    return decoded;
}

/**
 * 格式化金额
 * @param {number} amount - 需要格式化的金额
 * @param {Object} options - 配置选项
 * @param {string} options.currencySymbol - 货币符号，默认为 '$'
 * @param {number} options.decimals - 保留的小数位数，默认为 2
 * @param {string} options.thousandsSeparator - 千分位分隔符，默认为 ','
 * @param {string} options.decimalSeparator - 小数点分隔符，默认为 '.'
 * @returns {string} 格式化后的金额字符串
 */
function formatCurrency(amount: any, options: any = {}) {
    const { currencySymbol = '', decimals = 2, thousandsSeparator = ',', decimalSeparator = '.' } = options;

    if (isNaN(amount)) {
        return '-';
    }

    // 处理负数情况
    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount).toFixed(decimals);

    // 分割整数部分和小数部分
    let [integerPart, decimalPart] = absoluteAmount.split('.');

    // 添加千分位分隔符
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // 拼接最终结果
    const formattedAmount = `${isNegative ? '-' : ''}${currencySymbol}${integerPart}${decimals > 0 ? decimalSeparator + decimalPart : ''}`;

    return formattedAmount;
}

/**
 * 计算增长率
 * @param {number} oldValue - 初始值（基准值）
 * @param {number} newValue - 新值（比较值）
 * @param {number} decimals - 保留小数位数，默认为 2
 * @returns {string} 增长率（以百分比表示）
 */
function calculateGrowthRate(oldValue: any, newValue: any, decimals = 2) {
    if (isNaN(oldValue) || isNaN(newValue)) {
        return '-';
    }

    if (oldValue === 0) {
        // 避免除以零的问题
        return newValue > 0 ? '∞%' : '0%';
    }

    const growthRate = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    return `${growthRate.toFixed(decimals)}%`;
}

/**
 * 计算增长率并生成描述
 * @param {number} oldValue - 初始值
 * @param {number} newValue - 新值
 * @param {number} decimals - 保留小数位数，默认为 2
 * @returns {string} 增长描述
 */
function describeGrowthRate(oldValue: any, newValue: any, decimals = 2) {
    const growthRate = calculateGrowthRate(oldValue, newValue, decimals);
    if (parseFloat(growthRate) > 0) {
        return `↑ ${growthRate}`;
    } else if (parseFloat(growthRate) < 0) {
        return `↓ ${growthRate}`;
    } else {
        return '-';
    }
}

function copyToClipboard(text: string) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // 优先使用 Clipboard API
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    resolve('Text copied to clipboard successfully!');
                })
                .catch((err) => {
                    console.error('Failed to copy text to clipboard:', err);
                    reject(err);
                });
        } else {
            // 旧版兼容方法
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    resolve('Text copied to clipboard successfully!');
                } else {
                    reject(new Error('Fallback: Failed to copy text to clipboard.'));
                }
            } catch (err) {
                reject(err);
            } finally {
                document.body.removeChild(textArea);
            }
        }
    });
}

/**
 * 生成随机字符串 (Base64 实现)
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
function generateRandomStringBase64(length = 8) {
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));
    return btoa(String.fromCharCode(...randomBytes))
        .replace(/[+/=]/g, '') // 移除 Base64 不需要的字符
        .slice(0, length);
}

/**
 * 将时间戳转换为格式化的时间字符串
 * @param {number} timestamp - 时间戳（秒级或毫秒级）
 * @returns {string} 格式化后的时间字符串 (YYYY-MM-DD HH:mm:ss)
 */
function timestampToTime(timestamp: any) {
    // 如果时间戳是秒级，转换为毫秒级
    if (timestamp.toString().length === 10) {
        timestamp *= 1000;
    }

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function debounce<T extends (...args: any[]) => any>(func: T, delay: number, immediate: boolean = false): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        // @ts-ignore
        const context = this;

        const later = () => {
            timer = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timer;

        if (timer) clearTimeout(timer);
        timer = setTimeout(later, delay);

        if (callNow) func.apply(context, args);
    };
}

function sortByName(array:any, key = 'name', order = 'asc') {
    return array.sort((a:any, b:any) => {
      const nameA = a[key]?.toString().toLowerCase() || '';
      const nameB = b[key]?.toString().toLowerCase() || '';
  
      if (nameA < nameB) return order === 'asc' ? -1 : 1;
      if (nameA > nameB) return order === 'asc' ? 1 : -1;
      return 0; // If equal
    });
  }

function getTimeByRegion(region: string): string {
    // 区域到时区的映射表（可根据需要扩展）
    const regionToTimezone: any = {
        'DE': 'Europe/Berlin',
        'US': 'America/New_York',
        'IN': 'Asia/Kolkata',
        'CN': 'Asia/Shanghai',
        'JP': 'Asia/Tokyo',
        'AU': 'Australia/Sydney',
        'FR': 'Europe/Paris',
        'GB': 'Europe/London',
        'IT': 'Europe/Rome',
        'ES': 'Europe/Madrid',
        'RU': 'Europe/Moscow',
        'BR': 'America/Sao_Paulo',
        'CA': 'America/Toronto',
        'MX': 'America/Mexico_City',
        'ZA': 'Africa/Johannesburg',
        'EG': 'Africa/Cairo',
        'NG': 'Africa/Lagos',
        'KR': 'Asia/Seoul',
        'TH': 'Asia/Bangkok',
        'VN': 'Asia/Ho_Chi_Minh',
        'ID': 'Asia/Jakarta',
        'MY': 'Asia/Kuala_Lumpur',
        'SG': 'Asia/Singapore',
        'NZ': 'Pacific/Auckland',
        'AR': 'America/Argentina/Buenos_Aires',
        'CL': 'America/Santiago',
        'TR': 'Europe/Istanbul',
        'SA': 'Asia/Riyadh',
        'PK': 'Asia/Karachi',
        'BD': 'Asia/Dhaka',
        'IR': 'Asia/Tehran',
        'IQ': 'Asia/Baghdad',
        'SE': 'Europe/Stockholm',
        'NO': 'Europe/Oslo',
        'DK': 'Europe/Copenhagen',
        'FI': 'Europe/Helsinki',
        'GR': 'Europe/Athens',
        'PT': 'Europe/Lisbon',
        'PL': 'Europe/Warsaw',
        'HU': 'Europe/Budapest',
        'CZ': 'Europe/Prague',
        'SK': 'Europe/Bratislava',
        'RO': 'Europe/Bucharest',
        'BG': 'Europe/Sofia',
        'HR': 'Europe/Zagreb',
        'RS': 'Europe/Belgrade',
        'UA': 'Europe/Kyiv',
        'BY': 'Europe/Minsk',
        'LT': 'Europe/Vilnius',
        'LV': 'Europe/Riga',
        'EE': 'Europe/Tallinn',
        'IS': 'Atlantic/Reykjavik',
        'KE': 'Africa/Nairobi',
        'GH': 'Africa/Accra',
        'TZ': 'Africa/Dar_es_Salaam',
        'UG': 'Africa/Kampala',
        'ZM': 'Africa/Lusaka',
        'ZW': 'Africa/Harare',
        'IL': 'Asia/Jerusalem',
        'AE': 'Asia/Dubai',
        'OM': 'Asia/Muscat',
        'QA': 'Asia/Qatar',
        'BH': 'Asia/Bahrain',
        'KW': 'Asia/Kuwait',
        'AF': 'Asia/Kabul',
        'LK': 'Asia/Colombo',
        'MM': 'Asia/Yangon',
        'PH': 'Asia/Manila',
        'KH': 'Asia/Phnom_Penh',
        'LA': 'Asia/Vientiane',
        'MN': 'Asia/Ulaanbaatar',
        'PG': 'Pacific/Port_Moresby',
        'FJ': 'Pacific/Fiji',
        'VU': 'Pacific/Efate',
        'SB': 'Pacific/Guadalcanal',
        'TO': 'Pacific/Tongatapu',
        'WS': 'Pacific/Apia',
        'KI': 'Pacific/Tarawa',
        'NR': 'Pacific/Nauru',
        'TV': 'Pacific/Funafuti',
        'MH': 'Pacific/Majuro',
        'PW': 'Pacific/Palau',
        'BE': 'Europe/Brussels',
        'NP': 'Asia/Kathmandu',
        'NL': 'Europe/Amsterdam',
        'CH': 'Europe/Zurich',
        'VE': 'America/Caracas',
        'LU': 'Europe/Luxembourg',
        'MA': 'Africa/Casablanca',
        'EC': 'America/Guayaquil',
        'HK': 'Asia/Hong_Kong',
        'GT': 'America/Guatemala',
        'PR': 'America/Puerto_Rico',
        'PE': 'America/Lima',
        'HN': 'America/Tegucigalpa',
        'CI': 'Africa/Abidjan',
        'PA': 'America/Panama',
        'SI': 'Europe/Ljubljana',
        'ME': 'Europe/Podgorica',
        'TW': 'Asia/Taipei',
        'CG': 'Africa/Brazzaville',
        'DO': 'America/Santo_Domingo',
        'AT': 'Europe/Vienna',
        'NE': 'Africa/Niamey',
        'CR': 'America/Costa_Rica',
        'SV': 'America/El_Salvador',
        'GE': 'Asia/Tbilisi',
        'JO': 'Asia/Amman',
        'TJ': 'Asia/Dushanbe',
        'CO': 'America/Bogota',
        'XK': 'Europe/Belgrade',
        'EN': 'America/New_York',
        'KO': 'Asia/Seoul',
    };

    // 检查 region 参数是否为有效的字符串
    if (typeof region !== 'string' || region.trim() === '') {
        return '-';
    }

    const timezone = regionToTimezone[region.toUpperCase()];

    if (!timezone) {
        return '-';
    }

    try {
        // 获取当前时间并转换为目标时区
        const now = new Date();
        const options: any = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 使用 24 小时制
        };

        // 使用 Intl.DateTimeFormat 格式化时间
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedTime = formatter.format(now);

        return formattedTime; // 输出格式为 "HH:mm"
    } catch (error) {
        return '-';
    }
}

function getRandomItems(arr:any, num:any) {
    if (!Array.isArray(arr)) {
      throw new Error("Input should be an array.");
    }
  
    const itemsToSelect = Math.min(num, arr.length); // 如果数组长度小于 num，选择数组中所有元素
  
    const result = [];
    const seen = new Set(); // 用于记录已选的索引
  
    while (result.length < itemsToSelect) {
      const randomIndex = Math.floor(Math.random() * arr.length); // 获取随机索引
      if (!seen.has(randomIndex)) { // 确保不选重复的索引
        seen.add(randomIndex); // 记录已选索引
        result.push(arr[randomIndex]); // 添加到结果数组
      }
    }
  
    return result;
  }
  
const isElectron = () =>{
    if(navigator.userAgent.includes('Bool')){
        return true
    }else {
        return false
    }
}

export {
    parseJwt,
    isElectron,
    formatCurrency,
    debounce,
    getTimeByRegion,
    describeGrowthRate,
    copyToClipboard,
    generateRandomStringBase64,
    sortByName,
    getRandomItems,
    timestampToTime
};
