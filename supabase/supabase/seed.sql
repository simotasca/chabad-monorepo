-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."articles"("id", "created_at", "title", "content", "date", "image", "preview", "category", "draft", "slug")
  VALUES (16, '2023-10-12 18:54:04.759138+00', 'Le locuste sono per i goy', 'Prova di **articolo prova**

**nuova**', '2023-10-12 18:54:04.759138+00', 'https://picsum.photos/1200/800?c=1697138656864', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...', 'family', false, 'locuste'),
(14, '2023-10-12 16:59:20.86304+00', 'Demo from cose nuove', '# Hello world!

lorem ipsum

## liste:

* uno
* due
* tre', '2023-10-12 16:59:20.86304+00', 'https://picsum.photos/1200/800?c=1697136776758', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...', 'family', false, 'demo'),
(4, '2023-10-11 16:55:23.838601+00', 'Articolo che lo prova funzionante per davvero', '# hellow', '2023-10-11 16:55:23.838601+00', 'https://picsum.photos/1200/800?c=1697132408106', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...', 'torah', FALSE, 'dimostrativo'),
(18, '2023-10-12 18:57:45.231425+00', 'ciao', '@ hello world', '2023-10-12 18:57:45.231425+00', 'https://picsum.photos/1200/800?c=1697137065060', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...', 'torah', FALSE, 'ciao');

