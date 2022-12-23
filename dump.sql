--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url text NOT NULL,
    short_url text NOT NULL,
    url_visit_count integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '065e7fb9-9127-41c4-a0ce-c59cfd373b49', '2022-12-21 04:35:50.895648');
INSERT INTO public.sessions VALUES (2, 2, 'f73cabd2-25f1-4c63-9fd0-974e5624f7f4', '2022-12-21 14:46:46.331744');
INSERT INTO public.sessions VALUES (3, 3, 'e425603a-0860-4a7f-b06c-bc324d551a4a', '2022-12-22 03:25:01.820722');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 1, 'https://www.globo.com', 'OMQThuGRrn', 3, '2022-12-21 04:37:18.128216');
INSERT INTO public.urls VALUES (3, 2, 'https://marxists.org', '0_RxBrrWjA', 1, '2022-12-21 14:47:26.031185');
INSERT INTO public.urls VALUES (2, 1, 'https://www.brasildefato.com.br', '3i8vUFXK1B', 1, '2022-12-21 14:46:07.839835');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Tatiane Pilar', '$2a$10$Ji8qpKqspKF/7r5MWotD8eIMsDDSqKb5t.jXs53tLo1kk4bceq8Wu', 'tati@gmail.com', '2022-12-21 04:35:14.129352');
INSERT INTO public.users VALUES (2, 'Higor de Faria', '$2a$10$OU6dbuo85DXlFcgbVfsZE.k2uHS4YnK/I.RgUrRao0oqWzqKrEdA6', 'higorpr@gmail.com', '2022-12-21 04:35:36.822616');
INSERT INTO public.users VALUES (3, 'Mario', '$2a$10$HX8sZYX104wdkDWFDjrtmuqa4LlTc1i9hMNcGLnR0vF5T3NrpWRme', 'mario@gmail.com', '2022-12-22 03:24:36.551785');
INSERT INTO public.users VALUES (4, 'Higor de Faria 2', '$2a$10$B6rlbfzrLdYa/vJPk0PlSOs8W1te.nH1KyjETzUmCDV57WX2VWdB6', 'higorpr2@gmail.com', '2022-12-22 03:31:44.320828');
INSERT INTO public.users VALUES (5, 'Higor de Faria 3', '$2a$10$x0yWFrqpiZ6aKyc2UPrpuettYtZP0Eb3yT3nzeTxDvYf8i19PLTu6', 'higorpr3@gmail.com', '2022-12-22 03:31:50.783611');
INSERT INTO public.users VALUES (6, 'Higor de Faria 3', '$2a$10$XNFOETpshniRRX65HzTAaeOBYaynp/GN0UG9Q711mupEKE1Z8H/jK', 'higorpr4@gmail.com', '2022-12-22 03:31:53.989824');
INSERT INTO public.users VALUES (7, 'Higor de Faria 3', '$2a$10$ZjQzIkKe7LLF64Sv3NwHCOC5v6WJoCDvD2O034lrS2QYVTJwPzA3W', 'higorpr5@gmail.com', '2022-12-22 03:31:58.012207');
INSERT INTO public.users VALUES (8, 'Higor de Faria 3', '$2a$10$aCIS/0sLgMBEIPxQViELCOozHeWSZDB86/JSqEme3QKGu0iwPGDW.', 'higorpr6@gmail.com', '2022-12-22 03:32:00.669811');
INSERT INTO public.users VALUES (9, 'Higor de Faria 3', '$2a$10$qbXCP2kwmUpUY2QkO2d0e.IKgO.eoUlAXwbgUOW26GG1HkbqDczKi', 'higorpr7@gmail.com', '2022-12-22 03:32:03.226255');
INSERT INTO public.users VALUES (10, 'Higor de Faria 3', '$2a$10$dZYz..ph66vs7ASPU0kmceigRfLJ0EuiMA/xIibC0iBUB/flRMsuG', 'higorpr8@gmail.com', '2022-12-22 03:32:05.865105');
INSERT INTO public.users VALUES (11, 'Higor de Faria 3', '$2a$10$Djw2c3ob9yJwljrETVMcPOROjSxLuztcIVrG9xFTvYH.sUhroPqmW', 'higorpr9@gmail.com', '2022-12-22 03:32:08.938539');
INSERT INTO public.users VALUES (12, 'Higor de Faria 6', '$2a$10$reA1IfIhn8KxFfyYLJYUSuD.C4JF.J2OsTpUDf0IeO8YOFDoT0q4K', 'higorpr10@gmail.com', '2022-12-22 03:33:31.362539');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_key UNIQUE (user_id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

