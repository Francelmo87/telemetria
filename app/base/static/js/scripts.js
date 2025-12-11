const { Liquid, measureTextWidth } = G2Plot;

const color = ['#F4664A', '#FAAD14', '#FFFF00', '#5B8FF9'];
let liquidPlot;

function getContainerWidth() {
  const container = document.getElementById('liquid');
  return container ? container.clientWidth : 200;
}

function createOrUpdate(percent) {
  const containerWidth = getContainerWidth();

  if (!liquidPlot) {
    liquidPlot = new Liquid('liquid', {
      percent,
      radius: 0.8,
      shape: 'rect',
      autoFit: true,

      statistic: {
        title: {
          formatter: () => 'Nível',
          style: ({ percent }) => ({
            fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
            fontWeight: 600,
          }),
        },

        content: {
          customHtml: (container, view, { percent }) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
            const text = `${(percent * 100).toFixed(0)}%`;

            const textWidth = measureTextWidth(text, { fontSize: 20 });
            const scale = Math.min(d / textWidth, 1);

            return `
              <div style="
                width:${d}px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:${scale}em;
                font-weight:700;
                color:${percent > 0.65 ? "white" : "rgba(44,53,66,0.85)"};
              ">
                ${text}
              </div>`;
          },
        },
      },

      liquidStyle: ({ percent }) => ({
        fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
        stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
      }),

      color: () => '#5B8FF9',
    });

    liquidPlot.render();

  } else {
    liquidPlot.update({
      liquidStyle: ({ percent }) => ({
        fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
        stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
      }),
    });

    liquidPlot.changeData(percent);
  }
}

function fetchAndUpdate() {
  fetch("/tanks/level/")
    .then(res => res.json())
    .then(data => createOrUpdate(data.value))
    .catch(err => console.error("Erro ao obter nível:", err));
}

// inicializa
fetchAndUpdate();
setInterval(fetchAndUpdate, 10000);

window.addEventListener("resize", () => {
  if (liquidPlot) fetchAndUpdate();
});


//_____________________________________________________________
const { Line } = G2Plot;
let linePlot;

function fetchHistory() {
  fetch("/tanks/history/")
    .then(res => res.json())
    .then(data => {

      if (!linePlot) {
        linePlot = new Line("line", {
          data,
          xField: "time",
          yField: "value",
          autoFit: true,
          smooth: false,
          point: { size: 4, shape: "diamond" },

          yAxis: {
            label: {
              formatter: (v) => v + '%',
              style: {
                fill: '#ADFF2F',
              },
            },
          },
          xAxis: {
            tickCount: 24,
            label: {
              style: {
                fill: '#ADFF2F',
              },
            },
          },
          label: {
              style: {
                fill: '#ADFF2F',
              },
            },
          annotations: [
          // Alterações de cor abaixo de 25%           
            {
              type: 'regionFilter',
              start: ['min', '25'],
              end: ['max', '0'],
              color: '#F4664A',
            },
            {
              type: 'text',
              position: ['min', '25'],
              content: 'Mínimo',
              offsetY: -4,
              style: {
                textBaseline: 'bottom',
              },
            },
            {
              type: 'line',
              start: ['min', '25'],
              end: ['max', '25'],
              style: {
                stroke: '#F4664A',
                lineDash: [2, 2],
              },
            },
          ],
        });
        linePlot.render();
      } else {
        linePlot.changeData(data);
      }
    })
    .catch(err => console.error("Erro:", err));
}

// Atualiza histórico a cada 30s
setInterval(fetchHistory, 30000);
// chama na primeira vez
fetchHistory();


//----------------------------------------------------------------------------------------
// const { Line } = G2Plot;
// // Variável global para armazenar a instância do gráfico
// let linePlot;

// // Função que faz a requisição e renderiza/atualiza o gráfico
// function fetchHistory() {
//   fetch("/tanks/history/")
//     .then((res) => res.json()) // Transforma a resposta em JSON
//     .then((data) => {

//       console.log(data);
//       // Se o gráfico já existe, apenas atualize os dados
//       if (linePlot) {
//         // Atualiza os dados do gráfico existente
//         linePlot.changeData(data); // Atualiza os dados
//       } else {
//         // Caso contrário, crie um novo gráfico
//         linePlot = new Line('line', {
//           data, // Use os dados mais recentes
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

//         // Eventos de clique no gráfico
//         Line.on('element:click', (e) => {
//           console.log(e);
//         });
//         Line.on('annotation:click', (e) => {
//           console.log(e);
//         });
//         Line.on('axis-label:click', (e) => {
//           console.log(e);
//         });

//         // Renderize o gráfico
//         Line.render();
//         Line.update({ theme: 'dark' });
//       }
//     })
//     .catch((error) => {
//       console.error('Erro ao fazer a requisição:', error);
//     });
// }

// //Chama a função fetchData a cada 10 segundos (10000 ms)
// setInterval(fetchHistory, 30000);

// //Chama uma vez imediatamente para exibir o gráfico ao carregar a página
// fetchHistory();
