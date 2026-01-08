const wellness = {
  name: 'Wellness',
  icon: 'material-symbols-light:digital-wellbeing',
  iconSize: '3em',
  items: [
    'Weight-Loss Management',
    'Weight Management',
    'Wellness Program',
    'Anti-Aging Program',
    'Immunization',
    'Laboratory Results Interpretation',
    'Ultrasound Results Interpretation',
  ],
};

const s = {
  ob: {
    name: 'OB-GYN Services',
    sub: [
      {
        name: 'Consultations & Care',
        items: [
          'OB-Gyne Consultation',
          'Pre- & Post-Natal Check-up',
          'Prenatal Care',
          'Pregnancy Planning',
          'Childbirth (Normal / CS)',
          'Menopause Care',
          'Menstrual Health',
          'Family Planning',
          'Vaginal Infections',
          'Well-Woman Check-up',
        ],
      },
      {
        name: 'Procedures',
        items: [
          'Pap Smear (results in 3 days)',
          'D&C (Raspa)',
          'IUD Insertion',
          'Implant Removal',
          'General Pelvic Surgery',
          'Myoma / Ovarian Mass Management',
        ],
      },
      {
        name: 'OB-Focused Ultrasound',
        items: [
          'Pelvic Ultrasound',
          'TVS (Transvaginal Sonography)',
          'Transrectal Ultrasound',
          'Follicle Monitoring',
          'Biophysical Scoring with Biometry',
          'Fetal Doppler / Placental Doppler',
          '3D Ultrasound',
          '4D Ultrasound',
        ],
      },
    ],
  },
  others: [
    {
      name: 'Cardiology Services',
      icon: 'line-md:heart-filled',
      iconSize: '2.7em',
      items: [
        'Cardiology Check-up',
        'CP Clearance',
        'Cardiac Diagnostics',
        'ECG Testing',
        '2D Echocardiogram',
        '2D Echo with Doppler Studies',
      ],
    },
    {
      name: 'Laboratory Tests',
      icon: 'raphael:lab',
      iconSize: '3em',
      items: [
        'Complete Blood Count (CBC)',
        'Liver Function Test (LFT)',
        'Renal Function Test (RFT)',
        'Thyroid Function Test (TFT)',
        'Electrolytes',
        'Blood Typing',
        'Blood Biochemistry Tests',
        'General Laboratory Services',
      ],
    },
    {
      name: 'Ultrasound & Imaging Services',
      icon: 'line-md:computer-filled',
      iconSize: '2.7em',
      items: [
        'General Ultrasound',
        'Whole Abdominal UTZ',
        'Breast Ultrasound',
        'Prostate Ultrasound',
        'KUB (Kidneys, Ureters, Bladder)',
        'Scrotal / Inguinal Ultrasound',
      ],
    },
  ],
};

export default () => {
  const { ob, others } = s;
  return { ob, others: [wellness, ...others] };
};

export const getServicesMenu = () => {
  const { ob, others } = s;
  const obMenu = {
    name: ob.name,
    items: ob.sub.flatMap((sub: { items: string[] }) => sub.items),
  };

  const othersMenu = others.map((service: { name: string, items: string[] }) => ({
    name: service.name,
    items: service.items,
  }));

  return [wellness, obMenu, ...othersMenu];
};
