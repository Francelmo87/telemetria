const { Liquid } = G2Plot;

const color = ['#F4664A', '#FAAD14', '#FFFF00', '#5B8FF9'];

let liquidPlot; // Variável para armazenar a instância do gráfico

function fetchAndUpdate() {
  fetch("http://127.0.0.1:8000/reservatorio/nivel/")
    .then((res) => res.json())
    .then((data) => {
      const percent = data.valor; // Assumindo que o valor correto é retornado aqui

      if (!liquidPlot) {
        // Criação inicial do gráfico
        liquidPlot = new Liquid('liquid', {
          percent: percent,
          shape: 'rect',
          radius: 0.8,
          outline: {
            border: 2,
            distance: 4,
          },
          wave: {
            length: 128,
          },
          statistic: {
            title: {
              formatter: () => 'Nível',
              style: {
                fontSize: 30,
                fill: 'rgba(44,53,66,0.85)',
              },
            },
            content: {
              style: {
                fontSize: 60,
                lineHeight: 1,
                fill: 'rgba(44,53,66,0.85)',
              },
            },
          },
          liquidStyle: ({ percent }) => ({
            fill:
              percent < 0.25
                ? color[0]
                : percent < 0.5
                ? color[1]
                : percent < 0.75
                ? color[2]
                : color[3],
            stroke:
              percent < 0.25
                ? color[0]
                : percent < 0.5
                ? color[1]
                : percent < 0.75
                ? color[2]
                : color[3],
          }),
        });

        liquidPlot.render();
      } else {
        // Atualização eficiente do gráfico com changeData
        liquidPlot.update({
          statistic: {
            title: {
              formatter: () => 'Nível',
            },
            content: {
              formatter: () => `${(percent * 100).toFixed(0)}%`,
            },
          },
          liquidStyle: {
            fill:
              percent < 0.25
                ? color[0]
                : percent < 0.5
                ? color[1]
                : percent < 0.75
                ? color[2]
                : color[3],
            stroke:
              percent < 0.25
                ? color[0]
                : percent < 0.5
                ? color[1]
                : percent < 0.75
                ? color[2]
                : color[3],
          },
        });

        liquidPlot.changeData(percent);
      }
    })
    .catch((err) => {
      console.error('Erro ao carregar os dados:', err);
    });
}

// Atualiza os dados a cada 20 segundos
setInterval(fetchAndUpdate, 10000);

// Atualização inicial ao carregar a página
fetchAndUpdate();



//----------------------------------------------------------------------------------------

// Variável global para armazenar a instância do gráfico
// let line;

// // Função que faz a requisição e renderiza/atualiza o gráfico
// function fetchData() {
//   fetch("http://127.0.0.1:8000/reservatorio/linha/")
//     .then((res) => res.json()) // Transforma a resposta em JSON
//     .then((data) => {
//       console.log(data);
//       // Se o gráfico já existe, apenas atualize os dados
//       if (line) {
//         // Atualiza os dados do gráfico existente
//         line.changeData(data); // Atualiza os dados
//       } else {
//         // Caso contrário, crie um novo gráfico
//         line = new Line('line', {
//           data: data, // Use os dados mais recentes
//           padding: 'auto',
//           xField: 'time',
//           yField: 'value',
//           seriesField: 'date',
//           color: '#ADFF2F',
//           point: {
//             size: 4,
//             shape: 'diamond',
//             style: {
//               stroke: '#FE740C',
//               lineWidth: 2,
//               fillOpacity: 0.6,
//             },
//           },
//           yAxis: {
//             label: {
//               formatter: (v) => v + '%',
//               style: {
//                 fill: '#ADFF2F',
//               },
//             },
//           },
//           xAxis: {
//             tickCount: 24,
//             label: {
//               style: {
//                 fill: '#ADFF2F',
//               },
//             },
//           },
//           label: {
//             fill: '#FE740C',
//           },
//           annotations: [
//             {
//               type: 'regionFilter',
//               start: ['min', 'median'],
//               end: ['max', '0'],
//               color: '#F4664A',
//             },
//             {
//               type: 'text',
//               position: ['min', 'median'],
//               content: 'Mínimo',
//               offsetY: -4,
//               style: {
//                 textBaseline: 'bottom',
//               },
//             },
//             {
//               type: 'line',
//               start: ['min', 'median'],
//               end: ['max', 'median'],
//               style: {
//                 stroke: '#F4664A',
//                 lineDash: [2, 2],
//               },
//             },
//           ],
//         });

// //         // Eventos de clique no gráfico
//         line.on('element:click', (e) => {
//           console.log(e);
//         });
//         line.on('annotation:click', (e) => {
//           console.log(e);
//         });
//         line.on('axis-label:click', (e) => {
//           console.log(e);
//         });

//         // Renderize o gráfico
//         line.render();
//         line.update({ theme: 'dark' });
//       }
//     })
//     .catch((error) => {
//       console.error('Erro ao fazer a requisição:', error);
//     });
// }

// Chama a função fetchData a cada 10 segundos (10000 ms)
// setInterval(fetchData, 30000);

// Chama uma vez imediatamente para exibir o gráfico ao carregar a página
// fetchData();
