import { Team } from '../team.model';
import { Player } from '../player.model';

const playersManCity: Player[] = [
    { id: 1, name: 'Ederson', position: 'Portero', hasPlayed: true},
    { id: 2, name: 'Días', position: 'Defensa', hasPlayed: true},
    { id: 3, name: 'Gvardiol', position: 'Defensa', hasPlayed: true},
    { id: 4, name: 'Akanji', position: 'Defensa', hasPlayed: true},
    { id: 5, name: 'Rico Lewis', position: 'Defensa', hasPlayed: true},
    { id: 6, name: 'Kovacic', position: 'Medio Campista', hasPlayed: true},
    { id: 7, name: 'De Bruyne', position: 'Medio Campista', hasPlayed: true},
    { id: 8, name: 'Savinho', position: 'Medio Campista', hasPlayed: true},
    { id: 9, name: 'Bernardo Silva', position: 'Medio Campista', hasPlayed: true},
    { id: 10, name: 'Doku', position: 'Delantero', hasPlayed: true},
    { id: 11, name: 'Haaland', position: 'Delantero', hasPlayed: true},
    { id: 12, name: 'Ortega', position: 'Portero', hasPlayed: false},
    { id: 13, name: 'Grealish', position: 'Medio Campista', hasPlayed: false},
    { id: 14, name: 'Gündogan', position: 'Medio Campista', hasPlayed: false},
    { id: 15, name: 'Nunes', position: 'Medio Campista', hasPlayed: false},
    { id: 16, name: 'McAtee', position: 'Medio Campista', hasPlayed: false},
    { id: 17, name: 'Stones', position: 'Medio Campista', hasPlayed: false},
    { id: 18, name: 'Aké', position: 'Defensa', hasPlayed: false },
    { id: 19, name: 'Walker', position: 'Defensa', hasPlayed: false},
    { id: 20, name: 'Kaboré', position: 'Defensa', hasPlayed: false},
];

const playersManUtd: Player[] = [
    { id: 1, name: 'Onana', position: 'Portero', hasPlayed: true},
    { id: 2, name: 'Lisandro', position: 'Defensa', hasPlayed: true},
    { id: 3, name: 'Maguire', position: 'Defensa', hasPlayed: true},
    { id: 4, name: 'Dalot', position: 'Defensa', hasPlayed: true},
    { id: 5, name: 'Mazraoui', position: 'Defensa', hasPlayed: true},
    { id: 6, name: 'Mainoo', position: 'Defensa', hasPlayed: true},
    { id: 7, name: 'Casemiro', position: 'Medio Campista', hasPlayed: true},
    { id: 8, name: 'Mount', position: 'Medio Campista', hasPlayed: true},
    { id: 9, name: 'Traoré', position: 'Delantero', hasPlayed: true},
    { id: 10, name: 'Rashford', position: 'Delantero', hasPlayed: true},
    { id: 11, name: 'B. Fernandes', position: 'Delantero', hasPlayed: true},
    { id: 12, name: 'Bayindir', position: 'Goalkeeper', hasPlayed: false},
    { id: 13, name: 'Zirkzee', position: 'Medio Campista', hasPlayed: false},
    { id: 14, name: 'Evans', position: 'Defensa', hasPlayed: false},
    { id: 15, name: 'Garnacho', position: 'Defensa', hasPlayed: false},
    { id: 16, name: 'De Light', position: 'Defensa', hasPlayed: false},
    { id: 17, name: 'Eriksen', position: 'Defensa', hasPlayed: false},
    { id: 18, name: 'Collyer', position: 'Medio Campista', hasPlayed: false},
    { id: 19, name: 'McTominay', position: 'Medio Campista', hasPlayed: false},
    { id: 20, name: 'Antony', position: 'Delantero', hasPlayed: false},
];

export const MOCK_TEAMS: Team[] = [
    {
        name: 'Manchester City',
        onField: playersManCity.slice(0, 11), // Los primeros 11 jugadores en el campo
        onBench: playersManCity.slice(11), // El resto en la banca
        substitutions: 0,
        goalkeeper: playersManCity[0] // Asigna el primer jugador como portero por defecto
    },
    {
        name: 'Manchester United',
        onField: playersManUtd.slice(0, 11),
        onBench: playersManUtd.slice(11),
        substitutions: 0,
        goalkeeper: playersManUtd[0]
    }
];