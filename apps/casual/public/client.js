const title1 = {
  name: "h1",
  fields: { name: "text" },
  render: ({ name }) => `<h1>${name || ""}<h1>`
};

const title2 = {
  name: "h2",
  fields: { name: "text" },
  render: ({ name }) => `<h2>${name || ""}<h2>`
};

const title3 = {
  name: "h3",
  fields: { name: "text" },
  render: ({ name }) => `<h3>${name || ""}<h3>`
};

const toolbar = [
  title1, title2, title3,
  {
    name: "p",
    fields: { name: "text" },
    render: ({ name }) => `<p>${name}</p>`
  },
  {
    name: "card",
    fields: { title: "text", button: "text" },
    render: ({ title, button }) => `
      <div style="border: 2px solid tomato; color: red; padding: 0.5rem;">
        <h3 style="margin: 0;">${title || "title"}</h3>
        <button>${button || "click"}</button>
      </div>
    `
  }
];

const tree = [];

const editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");

function renderTree() {
  preview.innerHTML = "";
  console.log("TREEE", tree);

  for (const element of tree) {
    preview.innerHTML += element.render(element.values);
  }
}

for (const tool of toolbar) {
  // create controls
  const btn = document.createElement("button");
  btn.innerText = tool.name;
  btn.addEventListener("click", () => {
    addElement({ ...tool });
  });
  document.querySelector("#buttons").appendChild(btn);
}

function addElement(element) {
  element.elementEditor = document.createElement("div");
  element.values = {};

  const container = createElementContainer(element.name);
  element.elementEditor.appendChild(container);

  for (const field of Object.keys(element.fields)) {
    const fieldElement = createField(field);
    container.appendChild(fieldElement);
  }

  element.elementEditor.addEventListener("update-tree", (e) => {
    const field = e.detail.field;
    element.values[field] = e.detail.text();
    renderTree();
  });

  editor.appendChild(element.elementEditor);
  tree.push(element);
  renderTree();
}

function createElementContainer(name) {
  const container = document.createElement("div");
  const title = document.createElement("h4");
  title.innerText = name;
  title.style.margin = "0";
  container.appendChild(title);
  return container;
}

function createField(field) {
  const label = document.createElement("label");
  label.innerText = field;
  label.style.display = "block";
  const input = document.createElement("input");
  input.name = field;
  input.placeholder = field;
  input.addEventListener("input", e => {
    console.log("INPUTT");
    e.target.dispatchEvent(new CustomEvent("update-tree", {
      bubbles: true,
      detail: { text: () => e.target.value, field: e.target.name },
    }));
  });
  label.appendChild(input);
  return label;
}