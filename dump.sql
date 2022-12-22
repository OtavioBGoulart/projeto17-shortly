--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    short_url text NOT NULL,
    date date DEFAULT now(),
    visit_count integer NOT NULL,
    user_id integer NOT NULL
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
    name character varying(15) NOT NULL,
    email text NOT NULL,
    password text,
    create_at date DEFAULT now() NOT NULL
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
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (27, 'https://www.youtube.com/watch?v=jfKfPfyJRdk', 'Cg7i9o', '2022-12-22', 9, 13);
INSERT INTO public.urls VALUES (28, 'https://www.youtube.com/watch?v=tFFy0yEYki0', 'XoABIm', '2022-12-22', 3, 13);
INSERT INTO public.urls VALUES (30, 'https://www.youtube.com/watch?v=YHDansdSzrE', '32mU-x', '2022-12-22', 2, 14);
INSERT INTO public.urls VALUES (31, 'https://www.youtube.com/watch?v=WddpRmmAYkg', 'rRhnj3', '2022-12-22', 2, 16);
INSERT INTO public.urls VALUES (32, 'https://www.youtube.com/watch?v=iXrBO46Q-fw', 'Pv30a8', '2022-12-22', 0, 16);
INSERT INTO public.urls VALUES (33, 'https://www.youtube.com/watch?v=lgjY-lVtJZA', '6rZgmA', '2022-12-22', 0, 16);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (13, 'joao', 'joao@email.com', '$2b$11$UpyuKX1dHmO0JD9Zlm6UOukyuf89BH85RrFn/9slXMJYh688QbOOq', '2022-12-22');
INSERT INTO public.users VALUES (14, 'euuuuu', 'eu@email.com', '$2b$11$t5.uYiu6ciNXOXZRoRpJfeaxLicMFZEIPI9kgv4aFoQZOnL.wHodG', '2022-12-22');
INSERT INTO public.users VALUES (15, 'otavio', 'otavio@email.com', '$2b$11$eG4mFzaN9je78I61bjyIMO0FlPH7gZ/FTmsVnf3215c8R/rdgAOM6', '2022-12-22');
INSERT INTO public.users VALUES (16, 'marcio', 'marcio@email.com', '$2b$11$vWjN8azWYhp.CY/ZlUpS1uj3bSlfgS2GhIHPkarM6j76YAQPdty3W', '2022-12-22');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_short_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


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
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

