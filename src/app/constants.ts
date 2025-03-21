import { signal } from "@angular/core";

export const imgBasePath = 'https://sysmanagement.it/signature-assets/';

export const  companies = signal([
    {
      name: 'DigitalPlatforms SpA',
      btnName: 'DP',
      logo: imgBasePath + 'dp.png',
      color: '#005fb6',
      website: {
        name: 'dplatforms.it',
        href: 'https://www.dplatforms.it/'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Roma, Via Noale',
          address: 'Via Noale, 351, 00155, Roma',
          phone: '+39 062 291879',
          labelPhone: '+39 062 291879',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Roma, Viale Giorgio Ribotta',
          address: 'Viale Giorgio Ribotta, 11, 00144, Roma',
          phone: '+39 062 291879',
          labelPhone: '+39 062 291879',
          interno: null,
          internoLabel: null
        },
        {
          id: 3,
          name: 'Legnano',
          address: 'Via XX Settembre, 30 - Edificio B5, 20025, Legnano (MI)',
          phone: '+39 0331 456159',
          labelPhone: '+39 0331 456159',
          interno: null,
          internoLabel: null
        }
      ]
    },
    {
      name: 'DP Innovation',
      btnName: 'DP Innovation',
      logo: imgBasePath + 'dp_old_old.png',
      color: '#005fb6',
      website: null,
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Legnano',
          address: 'Via XX Settembre, 30 - Edificio B5, 20025 Legnano (MI)',
          phone: '+39 0331 456159',
          labelPhone: '+39 0331 456159',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Cadeo',
          address: 'Via Emilia 231, 29010 – Cadeo',
          phone: '+39 0523 50161',
          labelPhone: '+39 0523 50161',
          interno: null,
          internoLabel: null
        },
        {
          id: 3,
          name: 'Tortoreto',
          address: 'Via Nazionale, Km 404,500 – 64018 Tortoreto',
          phone: '+39 0861 772511',
          labelPhone: '+39 0861 772511',
          interno: null,
          internoLabel: null
        },
      ]
    },
    {
      name: 'DP Cyber & AI',
      btnName: 'DP Cyber & AI',
      logo: imgBasePath + 'DP-defence.png',
      color: '#005fb6',
      website: {
        name: 'dplatforms.it',
        href: "https://www.dplatforms.it/"
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Roma',
          address: 'Via Noale, 351, 00155, Roma',
          phone: '+39 062 291879',
          labelPhone: '+39 062 291879',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Tortoreto',
          address: 'Via Nazionale, Km 404,500 – 64018 Tortoreto',
          phone: '+39 0861 772511',
          labelPhone: '+39 0861 772511',
          interno: null,
          internoLabel: null
        },
      ]
    },
    {
      name: 'DP Infrastructures Selta',
      btnName: 'DP Infrastructures Selta',
      logo: imgBasePath + 'selta.png',
      color: '#005fb6',
      website: {
        name: 'selta.com',
        href: 'https://selta.com/'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Cadeo',
          address: 'Via Emilia 231, 29010 – Cadeo',
          phone: '+39 0523 50161',
          labelPhone: '+39 0523 50161',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Tortoreto',
          address: 'Via Nazionale, Km 404,500 – 64018 Tortoreto',
          phone: '+39 0861 772511',
          labelPhone: '+39 0861 772511',
          interno: null,
          internoLabel: null
        },
        {
          id: 3,
          name: 'Roma',
          address: 'Via Andrea Noale, 351 – 00155 Roma',
          phone: '+39 06 229 1879',
          labelPhone: '+39 06 229 1879',
          interno: null,
          internoLabel: null
        }
      ]
    },
    {
      name: 'AIDA srl',
      btnName: 'AIDA',
      logo: imgBasePath + 'aida.png',
      color: '#005fb6',
      website: {
        name: 'aida46.com',
        href: "https://www.aida46.com/"
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Roma, Via Noale',
          address: 'Via Noale, 351, 00155, Roma',
          phone: '+39 062 291879',
          labelPhone: '+39 062 291879',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Roma, Viale dell’Arte',
          address: 'Viale dell’Arte 25, 00144 Roma',
          phone: '+39 062 291879',
          labelPhone: '+39 062 291879',
          interno: null,
          internoLabel: null
        }
      ]
    },
    {
      name: 'DATABOOZ Italia S.r.l',
      btnName: 'DATABOOZ',
      logo: imgBasePath + 'databooz.png',
      color: '#005fb6',
      website: {
        name: 'databooz-italia.com',
        href: "https://databooz-italia.com/"
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Napoli',
          address: 'Centro Direzionale Napoli, Is. F2, Napoli',
          phone: '+39 081 7348074',
          labelPhone: '+39 081 7348074',
          interno: null,
          internoLabel: null
        }
      ]
    },
    // {
    //   name: 'El&Tec',
    //   btnName: 'El&Tec',
    //   logo: imgBasePath + 'el&tec.png',
    //   color: '#005fb6',
    //   website: {
    //     name: 'el-tec.eu',
    //     href: 'https://www.el-tec.eu'
    //   },
    //   versions: [],
    //   workplace: [
    //     {
    //       id: 1,
    //       name: 'Milano, Via Guglielmo Marconi, 5/7',
    //       address: 'Via Guglielmo Marconi, 5/7, 20065, Inzago (MI)',
    //       phone: "+39 036 3361466",
    //       labelPhone: "+39 036 3361466",
    //       interno: null,
    //       internoLabel: null
    //     },
    //     {
    //       id: 2,
    //       name: 'Milano, Via Guglielmo Marconi, 7',
    //       address: 'Via Guglielmo Marconi, 7, 20065, Inzago (MI)',
    //       phone: "+39 036 3361466",
    //       labelPhone: "+39 036 3361466",
    //       interno: null,
    //       internoLabel: null
    //     },
    //     {
    //       id: 3,
    //       name: 'Bergamo',
    //       address: 'via Pastrengo, 9 – 24068 Seriate, (BG)',
    //       phone: '+39 035 290049',
    //       labelPhone: '+39 035 290049',
    //       interno: null,
    //       internoLabel: null
    //     }
    //   ]
    // },
    {
      name: 'GIBIESSE Srl',
      btnName: 'Gibiesse',
      logo: imgBasePath + 'gibiesse.png',
      color: '#005fb6',
      website: {
        name: 'gibiesse-srl.it',
        href: 'https://www.gibiesse-srl.it'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Bergamo',
          address: 'via Pastrengo, 9 – 24068 Seriate, (BG)',
          phone: '+39 035 290049',
          labelPhone: '+39 035 290049',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Milano, Via Guglielmo Marconi, 5/7',
          address: 'Via Guglielmo Marconi, 5/7, 20065, Inzago (MI)',
          phone: "+39 0363 361466",
          labelPhone: "+39 0363 361466",
          interno: null,
          internoLabel: null
        },
      ]
    },
    {
      name: 'Omicron',
      btnName: 'Omicron',
      logo: imgBasePath + 'omicron.png',
      color: '#005fb6',
      website: {
        name: 'omicron-group.com',
        href: 'https://www.omicron-group.com'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Roma',
          address: 'Via Pennabilli 10, 00156, Roma ',
          phone: '+39 064110541',
          labelPhone: '+39 064110541',
          interno: null,
          internoLabel: null
        }
      ]
    },
    {
      name: 'Secureware',
      btnName: 'Secureware',
      logo: imgBasePath + 'secureware.png',
      color: '#005fb6',
      website: {
        name: 'secware.it',
        href: 'https://www.secware.it/'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Napoli',
          address: 'CDN Isola E7, Via Giovanni Porzio, 4 Napoli',
          phone: '+39 062291879',
          labelPhone: '+39 062291879',
          interno: null,
          internoLabel: null
        },
        {
          id: 2,
          name: 'Roma',
          address: 'Via Andrea Noale, 351 – 00155 Roma',
          phone: '+39 06 229 1879',
          labelPhone: '+39 06 229 1879',
          interno: null,
          internoLabel: null
        }
      ]
    },
    {
      name: 'System Management SpA',
      btnName: 'SM',
      logo: imgBasePath + 'square-logo.png',
      color: '#005fb6',
      website: {
        name: 'sysmanagement.it',
        href: 'https://www.sysmanagement.it'
      },
      versions: [
        {
          name: 'Animato',
          logo: imgBasePath + 'square-logo.gif'
        },
        {
          name: 'LGBT',
          logo: imgBasePath + 'sm-lgbt.png'
        },
        // {
        //   name: 'Holiday',
        //   logo: imgBasePath + 'square-xmas.png'
        // }
      ],
      workplace: [{
        id: 1,
        name: 'Napoli',
        address: 'CDN Isola E7, Via Giovanni Porzio, 4 Napoli',
        phone: '+39 19576070',
        labelPhone: '+39 08119576070',
        interno: '+390108',
        internoLabel: '+39 0810108'
      },
      {
        id: 2,
        name: 'Roma',
        address: 'viale Marco Polo, 59 Roma ',
        phone: null,
        labelPhone: null,
        interno: null,
        internoLabel: null
      },
      {
        id: 3,
        name: 'Milano',
        address: 'Viale Sarca, 336/f, 20126 Milano',
        phone: null,
        labelPhone: null,
        interno: null,
        internoLabel: null
      },
      {
        id: 4,
        name: 'Torino',
        address: 'C.so F. Ferrucci, 112/B1, 10138 Torino',
        phone: '+39 0117544500',
        labelPhone: '+39 0117544500',
        interno: '+39 01175445',
        internoLabel: '+39 01175445'
      }]
    },
    {
      name: 'Umpi S.r.l.',
      btnName: 'Umpi',
      logo: imgBasePath + 'umpi.png',
      color: '#005fb6',
      website: {
        name: 'umpi.it',
        href: 'https://www.umpi.it'
      },
      versions: [],
      workplace: [
        {
          id: 1,
          name: 'Rimini',
          address: 'S.S. Consolare Rimini-RSM 11 - 47923 Rimini',
          phone: '+39 0541 833160',
          labelPhone: '+39 0541 833160',
          interno: null,
          internoLabel: null
        }
      ]
    },
  ]);