--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE kyu08;
ALTER ROLE kyu08 WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
-- Name: tweets; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.tweets (
    id uuid NOT NULL,
    user_id uuid,
    content character varying(140),
    created_at timestamp without time zone
);


ALTER TABLE public.tweets OWNER TO kyu08;

--
-- Data for Name: tweets; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.tweets (id, user_id, content, created_at) FROM stdin;
\.


--
-- Name: tweets tweets_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweets
    ADD CONSTRAINT tweets_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "twitter-clone" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

--
-- Name: twitter-clone; Type: DATABASE; Schema: -; Owner: kyu08
--

CREATE DATABASE "twitter-clone" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE "twitter-clone" OWNER TO kyu08;

\connect -reuse-previous=on "dbname='twitter-clone'"

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
-- Name: test_table; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.test_table (
    name text NOT NULL,
    age integer
);


ALTER TABLE public.test_table OWNER TO kyu08;

--
-- Name: tweet_categories; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.tweet_categories (
    id integer NOT NULL,
    category character varying(30) NOT NULL
);


ALTER TABLE public.tweet_categories OWNER TO kyu08;

--
-- Name: tweet_index; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.tweet_index (
    tweet_id uuid NOT NULL,
    user_id uuid NOT NULL,
    category_id integer NOT NULL,
    tweeted_at timestamp without time zone NOT NULL
);


ALTER TABLE public.tweet_index OWNER TO kyu08;

--
-- Name: tweets; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.tweets (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    content character varying(140) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.tweets OWNER TO kyu08;

--
-- Name: user_relation; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.user_relation (
    following_user_id uuid NOT NULL,
    follower_user_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.user_relation OWNER TO kyu08;

--
-- Name: users; Type: TABLE; Schema: public; Owner: kyu08
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    screen_name character varying(15) NOT NULL,
    user_name character varying(50) NOT NULL,
    header_image_url character varying(120) NOT NULL,
    user_image_url character varying(120) NOT NULL,
    bio character varying(150),
    birthday date,
    user_location character varying(20),
    website character varying(100),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO kyu08;

--
-- Data for Name: test_table; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.test_table (name, age) FROM stdin;
hogehoge	123
tarooo	12
\.


--
-- Data for Name: tweet_categories; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.tweet_categories (id, category) FROM stdin;
1	tweet
2	reply
3	retweet
\.


--
-- Data for Name: tweet_index; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.tweet_index (tweet_id, user_id, category_id, tweeted_at) FROM stdin;
f94bdb40-f21f-4aa1-a3c4-8b1108ebdc46	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-04 14:57:52.868
1ae65347-eae4-454c-b119-f0ecfa11453c	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-04 15:00:33.849
80cd4f93-effe-4c8b-b5fb-691573b9b0f3	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-04 15:06:44.243
0aaab471-fb73-48cd-81b2-ef3134499776	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-05 00:02:13.257
e1dd7187-0e7e-4611-bd1f-320ba7d479e0	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-05 00:14:46.27
649b13a0-7bb4-4bac-b55c-be3364297bc6	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-09 00:43:25.146
78ef2b36-87c5-4d4a-a1e8-9413d5c2f4b8	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-09 23:37:17.075
cdb4ce56-4c3e-43b7-871c-7e1e6ef803ec	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-09 23:37:22.075
0e6d7586-17a7-4aad-890d-c6c05a8cdf96	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-10 13:43:55.174
086cad85-8ed1-4eb3-a4c7-6f1302a941cd	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-10 17:59:53.948
0baa2e43-ba6c-4112-ac7f-14b947e3b9ce	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2020-09-19 14:13:35.774
d97b10b9-2118-4df2-b34c-8fb615bd90f8	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-01-25 16:48:30.475
190e0566-980f-4c1d-bf2e-ce875928cf33	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-16 16:34:59.407
5ff3bc66-5177-4d29-875f-5396032ba894	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-16 23:19:22.862
dbce876d-feca-481f-85c8-9e325155c4f9	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-21 22:00:19.543
e03543a3-0f7d-447b-9a1e-508fb6612dcb	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-23 00:43:04.109
4747389c-3248-407d-a7a2-2760da180ec9	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-23 00:44:04.994
701683e4-b5fe-4057-93f9-295d1d20ed5f	e15a1c26-9a65-4f89-91b0-99b2055ae26f	1	2021-02-23 14:00:44.485
\.


--
-- Data for Name: tweets; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.tweets (id, user_id, content, created_at) FROM stdin;
321d3c0c-a287-40d4-99e8-60f0de6997f3	e15a1c26-9a65-4f89-91b0-99b2055ae26f	test tweet	2020-08-12 14:39:57.161
ba3d718d-797c-47b4-ac05-af71e5f0df23	e15a1c26-9a65-4f89-91b0-99b2055ae26f	test tweet2	2020-08-12 14:40:37.925
fdff3db5-4a25-4a59-a7f5-5b5a9092f8df	e15a1c26-9a65-4f89-91b0-99b2055ae26f	test tweet2	2020-08-12 14:54:17.286
8de77f1c-d32f-4308-9c47-cdfe9a23a84a	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2020-08-13 02:43:05.726
1879bb71-e9e7-4e07-a75f-48a15a894bcf	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2020-08-13 02:44:02.621
b13bdd57-7b05-4b82-aaf0-6387e5ed9c2f	e15a1c26-9a65-4f89-91b0-99b2055ae26f	this is is test 	2020-08-13 02:44:53.738
ac9e101a-eb18-4fb7-ab4d-88267e8bc047	e15a1c26-9a65-4f89-91b0-99b2055ae26f	good morning	2020-08-13 14:03:42.034
9072961b-cbd6-40fa-a395-f1de7a2a5619	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ieeeeeei	2020-08-13 15:51:55.927
badcff0e-8b5e-49b7-89ba-11f42a29aba8	e15a1c26-9a65-4f89-91b0-99b2055ae26f	いけるかなにほんご	2020-08-13 15:52:09.434
53d8bc00-06ef-4c69-af6e-75eb3f750e94	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげ	2020-08-13 16:16:29.694
255fe805-831f-43db-bcf8-af23b70af766	e15a1c26-9a65-4f89-91b0-99b2055ae26f	てすとてすと	2020-08-13 16:26:33.063
b69d689e-317d-4b20-8277-c1dbb9a833e4	e15a1c26-9a65-4f89-91b0-99b2055ae26f	そーとできてる〜	2020-08-13 16:42:13.532
aca0d8d0-92f6-41b6-ba28-23fc911e56be	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ないすですね〜！	2020-08-13 16:43:27.732
66fdae5f-2540-491b-9b2b-2e1df78506e9	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaaa	2020-08-13 16:44:51.598
b065389b-9ca8-4657-9eb7-d636455965ab	e15a1c26-9a65-4f89-91b0-99b2055ae26f	いえーーーい！	2020-08-13 20:25:39.978
ea81d0ee-f43d-45e5-bcb4-6a14add52c78	e15a1c26-9a65-4f89-91b0-99b2055ae26f	まつうくん天才	2020-08-13 21:04:02.282
2279d5fe-9277-495d-a151-c90da8fcb851	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hoge	2020-08-13 21:04:19.517
afd1f3d5-9448-4bd3-ad7f-5741c1113ee4	e15a1c26-9a65-4f89-91b0-99b2055ae26f	てすと〜〜〜	2020-08-14 16:22:39.094
fbefd134-12e2-440f-97b2-6019f7176e75	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hogemi	2020-08-15 17:23:24.912
4a3c9e5a-f5f1-4adb-af07-5e81ba380279	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2020-08-15 17:23:33.435
c0d99063-784e-4132-b45c-2b2fbc7590ff	e15a1c26-9a65-4f89-91b0-99b2055ae26f	kkk	2020-08-15 17:58:31.645
19915ac6-b2f9-4aca-89e2-35b0948763e7	e15a1c26-9a65-4f89-91b0-99b2055ae26f	insert test	2020-08-15 18:01:58.059
1b4ddd3a-7ac1-4f0e-980c-c03d09e54477	e15a1c26-9a65-4f89-91b0-99b2055ae26f	insert test	2020-08-15 18:02:51.531
5412ccf7-8d51-4747-a986-6cb5ad8e1d75	e15a1c26-9a65-4f89-91b0-99b2055ae26f	insert test	2020-08-15 18:03:55.493
127c8c61-5948-4049-a147-8551cdc38595	e15a1c26-9a65-4f89-91b0-99b2055ae26f	insert test	2020-08-15 18:05:36.966
6a95fbed-3a4b-40b5-aa6e-957be65aa914	e15a1c26-9a65-4f89-91b0-99b2055ae26f	いえええい	2020-08-15 19:16:25.268
7f11b646-6b92-4de9-b503-6008d738aad0	e15a1c26-9a65-4f89-91b0-99b2055ae26f	びょう	2020-08-15 22:08:22.74
87499cc4-d3d3-45ba-81ec-847c741362b2	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげほげほげ	2020-08-16 16:41:45.951
c43aed8a-4a8c-4bad-aef1-869f814f8c49	e15a1c26-9a65-4f89-91b0-99b2055ae26f	てーーすと	2020-08-16 17:12:38.601
260690d7-6917-4bd4-be25-3357fc5ac309	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2020-08-16 17:26:10.5
f6e1c435-bd99-4385-9da0-5d792ca11a6c	e15a1c26-9a65-4f89-91b0-99b2055ae26f	いいい	2020-08-16 19:15:10.594
8e2881ef-4725-49bb-8963-a01f44e0bb06	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ああ	2020-08-19 00:36:29.186
63224bfc-76a6-4bc8-8306-8d90a2ca0ae1	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ついーとできる	2020-08-19 14:21:49.549
a2a2e9ae-df8f-4ab6-ada3-804a5f188774	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aasd	2020-08-22 00:58:04.404
823b820d-73c0-4fd0-9da9-fbcb077a223d	e15a1c26-9a65-4f89-91b0-99b2055ae26f	おっけい	2020-08-22 01:21:20.156
b3748595-f489-43a5-bf19-08b715210466	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2020-08-22 01:28:28.699
a31cb630-730c-4ed0-9524-fa3bd7620c43	e15a1c26-9a65-4f89-91b0-99b2055ae26f	はい	2020-08-22 01:33:41.618
6a9567d4-fd2c-43d5-abe0-a16a0b56fbe1	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほいほい	2020-08-22 01:33:53.615
2658fc6d-34a2-4d92-abd4-e62ebaf3f624	e15a1c26-9a65-4f89-91b0-99b2055ae26f	あーあー	2020-08-22 01:34:30.638
16a627b1-7913-4b45-86c2-d332bab815d1	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげ	2020-08-22 18:51:21.079
ff647a09-913b-403d-8d87-6db9513b4971	e15a1c26-9a65-4f89-91b0-99b2055ae26f	a	2020-08-22 18:57:35.365
468ea35a-9ea7-4355-91a8-fd094af2bf18	e15a1c26-9a65-4f89-91b0-99b2055ae26f	いい	2020-08-23 00:25:40.133
777d7c42-91e3-439e-9b71-f2ee586917c5	e15a1c26-9a65-4f89-91b0-99b2055ae26f	zxc	2020-08-23 00:45:46.906
17ac3ac0-32b2-4f90-877c-0192134aaaa5	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hogehoge	2020-08-24 00:20:56.882
ab750125-c4b6-48bc-aa30-643a4cec866a	e15a1c26-9a65-4f89-91b0-99b2055ae26f	asd	2020-08-25 23:45:23.224
e12100f0-6b0d-4cbe-b036-af3f115b0417	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげほげ	2020-08-26 21:53:28.752
32b4ea9d-dff2-41ca-b81d-1e032e62447c	e15a1c26-9a65-4f89-91b0-99b2055ae26f	あ	2020-08-26 21:53:44.794
5631004f-2bf0-45d7-8bef-0a2364ce152f	e15a1c26-9a65-4f89-91b0-99b2055ae26f	o	2020-08-26 22:00:46.061
c58bf653-27e2-48e6-85c2-700b90930b87	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげほげ	2020-08-29 21:29:15.264
faec7ac8-d25e-4450-a087-4006a7096051	e15a1c26-9a65-4f89-91b0-99b2055ae26f	a	2020-08-31 00:47:51.335
f4046cea-c13b-440f-9e8b-96c43ea867a4	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ほげ	2020-09-02 13:21:12.2
f94bdb40-f21f-4aa1-a3c4-8b1108ebdc46	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aa	2020-09-04 14:57:52.868
1ae65347-eae4-454c-b119-f0ecfa11453c	e15a1c26-9a65-4f89-91b0-99b2055ae26f	test tes t	2020-09-04 15:00:33.849
80cd4f93-effe-4c8b-b5fb-691573b9b0f3	e15a1c26-9a65-4f89-91b0-99b2055ae26f	ababa	2020-09-04 15:06:44.243
0aaab471-fb73-48cd-81b2-ef3134499776	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hey hey hey	2020-09-05 00:02:13.257
e1dd7187-0e7e-4611-bd1f-320ba7d479e0	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aa	2020-09-05 00:14:46.27
649b13a0-7bb4-4bac-b55c-be3364297bc6	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hoge	2020-09-09 00:43:25.146
78ef2b36-87c5-4d4a-a1e8-9413d5c2f4b8	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aa	2020-09-09 23:37:17.075
cdb4ce56-4c3e-43b7-871c-7e1e6ef803ec	e15a1c26-9a65-4f89-91b0-99b2055ae26f	asdasd	2020-09-09 23:37:22.075
0e6d7586-17a7-4aad-890d-c6c05a8cdf96	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aa	2020-09-10 13:43:55.174
086cad85-8ed1-4eb3-a4c7-6f1302a941cd	e15a1c26-9a65-4f89-91b0-99b2055ae26f	heloo 	2020-09-10 17:59:53.948
0baa2e43-ba6c-4112-ac7f-14b947e3b9ce	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hogehoge	2020-09-19 14:13:35.774
d97b10b9-2118-4df2-b34c-8fb615bd90f8	e15a1c26-9a65-4f89-91b0-99b2055ae26f	hh	2021-01-25 16:48:30.475
190e0566-980f-4c1d-bf2e-ce875928cf33	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2021-02-16 16:34:59.407
5ff3bc66-5177-4d29-875f-5396032ba894	e15a1c26-9a65-4f89-91b0-99b2055ae26f	long long long long long long long long long long long long long long long long long long long long long long long long long tweet	2021-02-16 23:19:22.862
dbce876d-feca-481f-85c8-9e325155c4f9	e15a1c26-9a65-4f89-91b0-99b2055ae26f	test\n	2021-02-21 22:00:19.543
e03543a3-0f7d-447b-9a1e-508fb6612dcb	e15a1c26-9a65-4f89-91b0-99b2055ae26f	aaa	2021-02-23 00:43:04.109
4747389c-3248-407d-a7a2-2760da180ec9	e15a1c26-9a65-4f89-91b0-99b2055ae26f	dsada	2021-02-23 00:44:04.994
701683e4-b5fe-4057-93f9-295d1d20ed5f	e15a1c26-9a65-4f89-91b0-99b2055ae26f	asdasd	2021-02-23 14:00:44.485
\.


--
-- Data for Name: user_relation; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.user_relation (following_user_id, follower_user_id, created_at) FROM stdin;
08c19587-0dca-4e51-b1e5-4fa43087c3e1	e15a1c26-9a65-4f89-91b0-99b2055ae26f	2020-08-29 17:55:07.266
e15a1c26-9a65-4f89-91b0-99b2055ae26f	0ffaad1f-e1ef-44e7-9eec-5f010ad1fe78	2020-09-19 14:14:07.507
e15a1c26-9a65-4f89-91b0-99b2055ae26f	08c19587-0dca-4e51-b1e5-4fa43087c3e1	2021-02-21 21:39:03.237
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kyu08
--

COPY public.users (id, screen_name, user_name, header_image_url, user_image_url, bio, birthday, user_location, website, created_at, updated_at) FROM stdin;
e15a1c26-9a65-4f89-91b0-99b2055ae26f	kyu08	kyushima	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/default-user-image.png	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/e15a1c26-9a65-4f89-91b0-99b2055ae26f.png	helloo iam kyuushima.	1996-05-29	tokyo	kyuushima.com	2020-08-16 14:35:03.51	2020-08-16 14:35:03.51
08c19587-0dca-4e51-b1e5-4fa43087c3e1	tnk	tanaka_1	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/default-user-image.png	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/08c19587-0dca-4e51-b1e5-4fa43087c3e1.png	hey! iam tanaka	2020-08-08	kansai	tanaka.org	2020-08-16 14:35:03.51	2020-08-16 14:35:03.51
0ffaad1f-e1ef-44e7-9eec-5f010ad1fe78	jjj	johhhhn	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/default-user-image.png	https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/0ffaad1f-e1ef-44e7-9eec-5f010ad1fe78.png	this is johns page.	2020-08-04	somewhere	john.dev	2020-08-16 14:35:03.51	2020-08-16 14:35:03.51
\.


--
-- Name: test_table test_table_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.test_table
    ADD CONSTRAINT test_table_pkey PRIMARY KEY (name);


--
-- Name: tweet_categories tweet_categories_category_key; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweet_categories
    ADD CONSTRAINT tweet_categories_category_key UNIQUE (category);


--
-- Name: tweet_categories tweet_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweet_categories
    ADD CONSTRAINT tweet_categories_pkey PRIMARY KEY (id);


--
-- Name: tweet_index tweet_category_index_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweet_index
    ADD CONSTRAINT tweet_category_index_pkey PRIMARY KEY (tweet_id);


--
-- Name: tweets tweets_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweets
    ADD CONSTRAINT tweets_pkey PRIMARY KEY (id);


--
-- Name: user_relation user_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.user_relation
    ADD CONSTRAINT user_relation_pkey PRIMARY KEY (following_user_id, follower_user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_screen_name_key; Type: CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_screen_name_key UNIQUE (screen_name);


--
-- Name: tweet_index tweet_category_index_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kyu08
--

ALTER TABLE ONLY public.tweet_index
    ADD CONSTRAINT tweet_category_index_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.tweet_categories(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

