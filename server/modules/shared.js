'use strict'

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

const Departamentos = 
    [
        {
            Nombre: "Caribe Norte",
            Municipios: [{
                    Nombre: "Puerto Cabezas"
                },{
                    Nombre: "Bonanza"
                },{
                    Nombre: "Mulukukú"
                }, {
                    Nombre: "Prinzapolka"
                }, {
                    Nombre: "Rosita"
                }, {
                    Nombre: "Siuna"
                }, {
                    Nombre: "Waslala"
                }, {
                    Nombre: "Waspán"
                }
            ]
        },
        {
            Nombre: "Caribe Sur",
            Municipios: [{
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
                    Nombre: " 	El Rama"
                }
            ]
        },
        {
            Nombre: "Boaco",
            Municipios: [{
                Nombre: "Boaco"
            }, {
                    Nombre: " 	Camoapa"
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
        {
            Nombre: "Carazo",
            Municipios: [{
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
        {
            Nombre: "Chinandega",
            Municipios: [{
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
        {
            Nombre: "Chontales",
            Municipios: [{
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
        {
            Nombre: "Estelí",
            Municipios: [{
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
        {
            Nombre: "Granada",
            Municipios: [{
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
        {
            Nombre: "Jinotega",
            Municipios: [{
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
        {
            Nombre: "León",
            Municipios: [{
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
        {
            Nombre: "Madriz",
            Municipios: [{
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
        {
            Nombre: "Managua",
            Municipios: [{
                Nombre: "Ciudad Sandino"
            }, {
                    Nombre: "El Crucero"
                }, {
                    Nombre: "Managua"
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
        {
            Nombre: "Masaya",
            Municipios: [{
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
        {
            Nombre: "Matagalpa",
            Municipios: [{
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
        {
            Nombre: "Nueva Segovia",
            Municipios: [{
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
        {
            Nombre: "Río San Juan",
            Municipios: [{
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
        {
            Nombre: "Rivas",
            Municipios: [{
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
    ]
