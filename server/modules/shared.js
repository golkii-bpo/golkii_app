'use strict'
// DEVUELVE UN STRING CON LA PRIMERA LETRA EN MAYUSCULA Y EL RESTO EN MINUSCULA
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

// VARIABLES DE FECHA

const Now = new Date();
const MinDate = new Date('2018-06-01');
const dateFormat = "dd/MM/yyyy";


// DEPARTAMENTOS Y MUNICIPIOS DE NICARAGUA
const Departamentos = {
    "Caribe Norte": {
        MAP_ORDER: 16,
        MAP_KEY: "RAACN",
        Municipios: [
            {
                Nombre: "Puerto Cabezas"
            }, 
            {
                Nombre: "Bonanza"
            }, 
            {
                Nombre: "Mulukukú"
            }, 
            {
                Nombre: "Prinzapolka"
            }, 
            {
                Nombre: "Rosita"
            }, 
            {
                Nombre: "Siuna"
            }, 
            {
                Nombre: "Waslala"
            }, 
            {
                Nombre: "Waspán"
            }
        ]
    },
    "Caribe Sur": {
        MAP_ORDER: 17,
        MAP_KEY:"RAACS",
        Municipios: [
            {
                Nombre: "Bluefields"
            }, {
                Nombre: "Corn Island"
            }, {
                Nombre: "Desembocadura de Río Grande"
            }, {
                Nombre: "El Ayote"
            }, {
                Nombre: "El Tortuguero"
            }, {
                Nombre: "Kukra Hill"
            }, {
                Nombre: "La Cruz de Río Grande"
            }, {
                Nombre: "Laguna de Perlas"
            }, {
                Nombre: "Muelle de los Bueyes"
            }, {
                Nombre: "Nueva Guinea"
            }, {
                Nombre: "Paiwas"
            }, {
                Nombre: "El Rama"
            }
        ]
    },
    "Boaco": {
        MAP_ORDER: 13,
        MAP_KEY: "Boaco",
        Municipios: [
            {
                Nombre: "Boaco"
            }, {
                Nombre: "Camoapa"
            }, {
                Nombre: "San Lorenzo"
            }, {
                Nombre: "San José de Los Remates"
            }, {
                Nombre: "Santa Lucía"
            }, {
                Nombre: "Teustepe"
            }
        ]
    },
    "Carazo": {
        MAP_ORDER: 6,
        MAP_KEY: "Carazo",
        Municipios: [
            {
                Nombre: "Diriamba"
            }, {
                Nombre: "Dolores"
            }, {
                Nombre: "El Rosario"
            }, {
                Nombre: "Jinotepe"
            }, {
                Nombre: "La Conquista"
            }, {
                Nombre: "La Paz de Oriente"
            }, {
                Nombre: "San Marcos"
            }, {
                Nombre: "Santa Teresa"
            }
        ]
    },
    "Chinandega": {
        MAP_ORDER: 1,
        MAP_KEY: "Chinandega",
        Municipios: [
            {
                Nombre: "Chichigalpa"
            }, {
                Nombre: "Chinandega"
            }, {
                Nombre: "Cinco Pinos"
            }, {
                Nombre: "Corinto"
            }, {
                Nombre: "El Realejo"
            }, {
                Nombre: "El Viejo"
            }, {
                Nombre: "Posoltega"
            }, {
                Nombre: "San Francisco del Norte"
            }, {
                Nombre: "San Pedro del Norte"
            }, {
                Nombre: "Santo Tomás del Norte"
            }, {
                Nombre: "Somotillo"
            }, {
                Nombre: "Puerto Morazán"
            }, {
                Nombre: "Villanueva"
            }
        ]
    },
    "Chontales": {
        MAP_ORDER: 14,
        MAP_KEY: "Chontales",
        Municipios: [
            {
                Nombre: "Acoyapa"
            }, {
                Nombre: "Comalapa"
            }, {
                Nombre: "San Francisco de Cuapa"
            }, {
                Nombre: "El Coral"
            }, {
                Nombre: "Juigalpa"
            }, {
                Nombre: "La Libertad"
            }, {
                Nombre: "San Pedro de Lóvago"
            }, {
                Nombre: "Santo Domingo"
            }, {
                Nombre: "Santo Tomás"
            }, {
                Nombre: "Villa Sandino"
            }
        ]
    },
    "Estelí": {
        MAP_ORDER: 10,
        MAP_KEY: "Esteli",
        Municipios: [
            {
                Nombre: "Condega"
            }, {
                Nombre: "Estelí"
            }, {
                Nombre: "La Trinidad"
            }, {
                Nombre: "Pueblo Nuevo"
            }, {
                Nombre: "San Juan de Limay"
            }, {
                Nombre: "San Nicolás"
            }
        ]
    },
    "Granada": {
        MAP_ORDER: 5,
        MAP_KEY: "Granada",
        Municipios: [
            {
                Nombre: "Diriá"
            }, {
                Nombre: "Diriomo"
            }, {
                Nombre: "Granada"
            }, {
                Nombre: "Nandaime"
            }
        ]
    },
    "Jinotega": {
        MAP_ORDER: 11,
        MAP_KEY: "Jinotega",
        Municipios: [
            {
                Nombre: "El Cuá"
            }, {
                Nombre: "Jinotega"
            }, {
                Nombre: "La Concordia"
            }, {
                Nombre: "San José de Bocay"
            }, {
                Nombre: "San Rafael del Norte"
            }, {
                Nombre: "San Sebastián de Yalí"
            }, {
                Nombre: "Santa María de Pantasma"
            }, {
                Nombre: "Wiwilí de Jinotega"
            }
        ]
    },
    "León": {
        MAP_ORDER: 2,
        MAP_KEY: "Leon",
        Municipios: [
            {
                Nombre: "Achuapa"
            }, {
                Nombre: "El Jicaral"
            }, {
                Nombre: "El Sauce"
            }, {
                Nombre: "La Paz Centro"
            }, {
                Nombre: "Larreynaga"
            }, {
                Nombre: "León"
            }, {
                Nombre: "Nagarote"
            }, {
                Nombre: "Quezalguaque"
            }, {
                Nombre: "Santa Rosa del Peñón"
            }, {
                Nombre: "Telica"
            }
        ]
    },
    "Madriz": {
        MAP_ORDER: 9,
        MAP_KEY: "Madriz",
        Municipios: [
            {
                Nombre: "Las Sabanas"
            }, {
                Nombre: "Palacagüina"
            }, {
                Nombre: "San José de Cusmapa"
            }, {
                Nombre: "San Juan de Río Coco"
            }, {
                Nombre: "San Lucas"
            }, {
                Nombre: "Somoto"
            }, {
                Nombre: "Telpaneca"
            }, {
                Nombre: "Totogalpa"
            }, {
                Nombre: "Yalagüina"
            }
        ]
    },
    "Managua": {
        MAP_ORDER: 3,
        MAP_KEY: "Managua",
        Municipios: [
            {
                Nombre: "Managua"
            }, {
                Nombre: "El Crucero"
            }, {
                Nombre: "Ciudad Sandino"
            }, {
                Nombre: "Mateare"
            }, {
                Nombre: "San Francisco Libre"
            }, {
                Nombre: "San Rafael del Sur"
            }, {
                Nombre: "Ticuantepe"
            }, {
                Nombre: "Tipitapa"
            }, {
                Nombre: "Villa El Carmen"
            }
        ]
    },
    "Masaya": {
        MAP_ORDER: 4,
        MAP_KEY: "Masaya",
        Municipios: [
            {
                Nombre: "Catarina"
            }, {
                Nombre: "La Concepción"
            }, {
                Nombre: "Masatepe"
            }, {
                Nombre: "Masaya"
            }, {
                Nombre: "Nandasmo"
            }, {
                Nombre: "Nindirí"
            }, {
                Nombre: "Niquinohomo"
            }, {
                Nombre: "San Juan de Oriente"
            }, {
                Nombre: "Tisma"
            }
        ]
    },
    "Matagalpa": {
        MAP_ORDER: 12,
        MAP_KEY: "Matagalpa",
        Municipios: [
            {
                Nombre: "Ciudad Darío"
            }, {
                Nombre: "El Tuma - La Dalia"
            }, {
                Nombre: "Esquipulas"
            }, {
                Nombre: "Matagalpa"
            }, {
                Nombre: "Matiguás"
            }, {
                Nombre: "Muy Muy"
            }, {
                Nombre: "Rancho Grande"
            }, {
                Nombre: "Río Blanco"
            }, {
                Nombre: "San Dionisio"
            }, {
                Nombre: "San Isidro"
            }, {
                Nombre: "San Ramón"
            }, {
                Nombre: "Sébaco"
            }, {
                Nombre: "Terrabona"
            }
        ]
    },
    "Nueva Segovia": {
        MAP_ORDER: 8,
        MAP_KEY: "NSegovia",
        Municipios: [
            {
                Nombre: "Ciudad Antigua"
            }, {
                Nombre: "Dipilto"
            }, {
                Nombre: "El Jícaro"
            }, {
                Nombre: "Wiwilí"
            }, {
                Nombre: "Jalapa"
            }, {
                Nombre: "Macuelizo"
            }, {
                Nombre: "Mozonte"
            }, {
                Nombre: "Murra"
            }, {
                Nombre: "Ocotal"
            }, {
                Nombre: "Quilalí"
            }, {
                Nombre: "San Fernando"
            }, {
                Nombre: "Santa María"
            }
        ]
    },
    "Río San Juan": {
        MAP_ORDER: 15,
        MAP_KEY: "RSnJuan",
        Municipios: [
            {
                Nombre: "El Almendro"
            }, {
                Nombre: "El Castillo"
            }, {
                Nombre: "Morrito"
            }, {
                Nombre: "San Carlos"
            }, {
                Nombre: "San Juan del Norte"
            }, {
                Nombre: "San Miguelito"
            }
        ]
    },
    "Rivas": {
        MAP_ORDER: 7,
        MAP_KEY: "Rivas",
        Municipios: [
            {
                Nombre: "Altagracia"
            }, {
                Nombre: "Belén"
            }, {
                Nombre: "Buenos Aires"
            }, {
                Nombre: "Cárdenas"
            }, {
                Nombre: "Moyogalpa"
            }, {
                Nombre: "Potosí"
            }, {
                Nombre: "Rivas"
            }, {
                Nombre: "San Jorge"
            }, {
                Nombre: "San Juan del Sur"
            }, {
                Nombre: "Tola"
            }
        ]
    }
}

const TiposInsumo = 
{
    "Transporte": {
        description:"Viatico de Transporte",
        label: "C$",
        lpos: "start",
        key: "Transporte"

    },
    "Alimento": {
        description: "Viatico Alimenticio",
        label: "C$",
        lpos: "start",
        key: "Alimento"
    },
    "Gasolina": {
        description: "Gasolina",
        label: "Lt",
        lpos: "end",
        key: "Gasolina"
    }
}

const swLoading = Swal.mixin({
    html: '<div class="text-center"><i class="fas fa-spinner fa-5x fa-spin text-white"></i></div>',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    background: 'transparent'
});

const ramdomRange = (min, max, diffOf) => {
    do  {
        v = Math.floor(Math.random() * max) + min;
    } while(v==diffOf)
    return v;
}

const toDate = (dateStr,splitter) => {
    const [day, month, year] = dateStr.split(splitter)
    console.log('====================================');
    console.log("PARSING");
    console.log("day: \t", day);
    console.log("month: \t", month);
    console.log("year: \t", year);
    console.log('====================================');
    return new Date(year, month - 1, day)
}

// Metodo para la carga del SWAL de error
const errorSWAL = (text) => {
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: text
    })
}