export function formatCurrency(value, currency = 'BRL') {
  return value?.toLocaleString('pt-BR', { style: 'currency', currency });
}
