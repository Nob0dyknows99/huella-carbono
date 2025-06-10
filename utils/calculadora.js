import { factoresChile } from '../data/factoresChile';

export function calcularHuellaCarbono({ transporte, energia, dieta }) {
  const kmAnuales = transporte.kmSemanales * 52;
  const emisionTransporte = kmAnuales * factoresChile.transporte[transporte.tipo];
  const consumoEnergia = energia.kwhMes * 12 * factoresChile.energia.kwh;
  const consumoGas = energia.gasKgMes * 12 * factoresChile.energia.gas_kg;
  const dietaCO2 = factoresChile.alimentacion[dieta];

  const total = (emisionTransporte + consumoEnergia + consumoGas + dietaCO2 * 1000) / 1000;

  return {
    transporte: emisionTransporte / 1000,
    energia: (consumoEnergia + consumoGas) / 1000,
    alimentacion: dietaCO2,
    total,
  };
}
