import { factoresEcologicos } from '../data/factoresChile';

export function calcularHuellaEcologica({ transporte, energia, dieta }) {
  const kmAnuales = transporte.kmSemanales * 52;

  // Transporte
  const huellaTransporte = kmAnuales * factoresEcologicos.transporte[transporte.tipo];

  // Energía
  const huellaElectricidad = energia.kwhMes * 12 * factoresEcologicos.energia.kwh;
  const huellaGas = energia.gasKgMes * 12 * factoresEcologicos.energia.gas_kg;
  const huellaEnergia = huellaElectricidad + huellaGas;

  // Alimentación
  const huellaAlimentacion = factoresEcologicos.alimentacion[dieta];

  // Valores promedio adicionales
  const huellaConsumoBienes = factoresEcologicos.consumoBienes;
  const huellaResiduos = factoresEcologicos.residuos.promedio;
  const huellaVivienda = factoresEcologicos.vivienda.casa_pequena; // puedes personalizar más adelante

  const total = huellaTransporte + huellaEnergia + huellaAlimentacion + huellaConsumoBienes + huellaResiduos + huellaVivienda;

  return {
    transporte: huellaTransporte,
    energia: huellaEnergia,
    alimentacion: huellaAlimentacion,
    consumo: huellaConsumoBienes,
    residuos: huellaResiduos,
    vivienda: huellaVivienda,
    total,
  };
}
