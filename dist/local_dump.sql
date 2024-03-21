--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: misc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.misc (
    apk_url text,
    version text
);


ALTER TABLE public.misc OWNER TO postgres;

--
-- Name: userrecords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userrecords (
    userid integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    tags character varying(255)[] NOT NULL,
    media text[],
    ruid uuid NOT NULL
);


ALTER TABLE public.userrecords OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    foldername text DEFAULT ''::text,
    backupmegaacc text DEFAULT 'kondashivaradhan007@gmail.com'::text,
    quota numeric(10,2) DEFAULT 1024.00
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: misc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.misc (apk_url, version) FROM stdin;
https://expo.dev/artifacts/eas/dwFZr7H1yLErazg7Bns4JA.apk	1.5
\.


--
-- Data for Name: userrecords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userrecords (userid, title, description, tags, media, ruid) FROM stdin;
17	U2FsdGVkX19Bz8KOjfO/+zdtKKbhAMcwP05H24pMhKE=	U2FsdGVkX19IKWcc8+xeP3s6pJ9oXVVvS45lxOqUM6g=	{U2FsdGVkX18n33u89LIWDJjbr+3fmFqFPWcYmYOFNTM=}	{"{\\"name\\":\\"IMG_5502.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1oo23IgwdoODS0vrC0Zcuqx0Z46aFXDnN/view?usp=drivesdk\\"}","{\\"name\\":\\"IMG_5500.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1vw7xp-2vQzcBz5qzrMHunstqouLJMIc9/view?usp=drivesdk\\"}","{\\"name\\":\\"IMG_5494.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/10TdSxAH9nXyh6tUK7OpGN_nE97zfBeUK/view?usp=drivesdk\\"}","{\\"name\\":\\"IMG_5532.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1bgJsvj87vfC7vbMts9CtWu6G9ptJgGD8/view?usp=drivesdk\\"}"}	153286dc-75c3-40a6-a334-719d7d57129a
17	U2FsdGVkX1/verF2RszlVei9dH8E4Ur7kluZNyHC5YI=	U2FsdGVkX19TzVyWbyMJIg+xVYSqltQ8E8TmzkMBmq0=	{U2FsdGVkX1+5xeGvA7Fx5+C0TJ9TmZkq8CZaWxjNxm8=}	{"{\\"name\\":\\"IMG_20231212_180715.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/19LwQoqP6YmyLnrnlI-fO_Fr0l8REuUS3/view?usp=drivesdk\\"}","{\\"name\\":\\"Screenshot_2023-12-03-02-37-38-14_df198e732186825c8df26e3c5a10d7cd.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/17XrqOkN6Vdvw6luGikWIXCygFwDxUUIl/view?usp=drivesdk\\"}","{\\"name\\":\\"Screenshot_2023-12-03-03-19-43-24_948cd9899890cbd5c2798760b2b95377.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1Gca0RDP7dfZdP2kAeJ-44xgvCdWhurH6/view?usp=drivesdk\\"}","{\\"name\\":\\"Screenshot_2023-12-03-03-20-18-53_948cd9899890cbd5c2798760b2b95377.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1Qz12gmohHyITgibpYk8381YcWOoqnv5d/view?usp=drivesdk\\"}","{\\"name\\":\\"Screenshot_2023-12-03-03-20-31-55_948cd9899890cbd5c2798760b2b95377.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1Rbjf_gmem0a_3xRLV3K-5HhQGmAjce2O/view?usp=drivesdk\\"}"}	af043005-0982-4763-a919-187b84fb953f
1	U2FsdGVkX18TBaLZ/2PuMcUySupYLHzVDSO3FxSh5Q4=	U2FsdGVkX1+SfVEAd51WK7BSBgdPqA/SC7H7czydKNY=	{U2FsdGVkX19AsZxW3lmEJoOVp0zIo/Gwh9MxheHauRw=,U2FsdGVkX1/ZnxDTN0THM5uqeFQ8tU0YW7tHNxtbiH8=}	{"{\\"name\\":\\"OptEad.pdf\\",\\"url\\":\\"https://drive.google.com/file/d/1PcTKiHJjFfFrNp9nsQ0pHI2hVOfyarQe/view?usp=drivesdk\\"}"}	6b33fe05-3b09-499f-a64b-d7375d9758b3
14	U2FsdGVkX1/z/9OBDrP6+FXjqTGzvD7UKfyeWs80FCM=	U2FsdGVkX197IpYu4Kan83AtLfZHg77RCJKCpelf8aY=	{U2FsdGVkX1+BeD6bfGPwC4g6iCSQhEwF/SGSxEjoAf4=,U2FsdGVkX18eNRNwP+fI2GPG8chyhyAZuYt4epudOxM=}	{"{\\"name\\":\\"IMG-20231213-WA0007.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1W_iMdCKN45PQ-EdKsWddh1mzUgmupm4y/view?usp=drivesdk\\"}"}	ac7e6f58-4419-4b1d-a302-45f187f4dde4
12	U2FsdGVkX1/qew8Pp0icCR+HNwYjOfPYIEuluLRogYE=	U2FsdGVkX194afJPTfmfhV41jiGMvXW+j04dXcNk194=	{U2FsdGVkX1/jB90luGnZDtstgy+ofajhxzW3sYlkC3Q=}	{}	5fe9246d-df43-457c-b2ba-72aebe1142fe
12	U2FsdGVkX1953PomCgCA6uv2xFgpqfKPgen9TZJqp/o=	U2FsdGVkX18Jc74sSXSYi5nGGcRVjd1M5LYlmjb88w8=	{U2FsdGVkX18LkB0GISMNt5w9042JFu9k3WPMqZ3p/6g=}	{"{\\"name\\":\\"IMG-20231214-WA0002.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1OkIp4UQiwrAEw5QssktpImcw2U_Py7Cr/view?usp=drivesdk\\"}"}	8e80344d-fbda-443d-92d4-aa113825c46b
18	U2FsdGVkX19k58trDvN9bNEMvNNB8rByeyaVGb3ikQU=	U2FsdGVkX19NBXXLEgECqUvRelcnC1bLgF/2IpfyeesOFLSPCG8V2l63gFbhfcGuj3m57Rx5YQKXXgvTddlWX7a9aNPeHy1FzzG2ZE2I6QvI+zhZxWmFc0QvxS3N49ldcksw3rCL3W4L+s90BXcNtm4e2mA7mAVopXd1pBIPXt4=	{U2FsdGVkX1/KPmP8Ig6sKc1TfGdzXXAEIPjxZXUr/jU=,U2FsdGVkX18uj8EPDL6Bqzu+iYsgo0xxt4FGabbL1BI=}	{}	2771ff5d-41c3-40c4-bf71-5a4934868882
1	U2FsdGVkX19OFg2N4k5XNekzxXLzhzHzvwDiLG6YOuarqg1JG76lB/yYUMFd1EG8	U2FsdGVkX19qLUSnPd5OvEtih6eqvrdpnrFBIa8Y0/6gLLNUOoKfgtC2/jmOz53K	{U2FsdGVkX1+o7bsEJo4QGtMweYPqAOsOVvLP8Ermknw=,U2FsdGVkX1+PHlODgBZZGLz4Q6825AJPRpfk/3k6sxU=}	{"{\\"name\\":\\"IMG_20231216_121531.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1KLmeZ5iVML5RB8jtUUZ-hxfIfaYY7-zJ/view?usp=drivesdk\\"}"}	1a285f35-5c53-422a-9220-6c7fbe03c0fc
18	U2FsdGVkX19zx/3yCXdJ/EZHmTNmF4BiOHdDzyiie5I=	U2FsdGVkX1/dTGreuUKmCkfjlhpHJ7x2nkk2row2G2f1SXuGbXalueRykNYJxT5ZG9GVc4X91GuUV6x46u7WKqR+qEbUPBBEs94Eoi7E9ubVoEJTZGJ3aI0QW4xUnZ7+M3GKGSwPEvXU2wSpI8akQL9cYbmtDm46WBVhQpGJKdk=	{U2FsdGVkX1+DLy7q7M9JZMRcKumWFwFu+t6JBfVkh8Y=,U2FsdGVkX1/FAU9rB49FVUtx2MYoq1btJZL/CyVV+mo=}	{}	679f795a-2aa7-4011-9381-001c4f4921ce
1	U2FsdGVkX19JpzBwuiypX/Cp/WXuWFwTdQeb4Yy2u0OLwNCBAt6GQGnWpx4/5l3Q	U2FsdGVkX1+A3WBZJNkhWlwv+obK9cNhp504XN5N6s91/fOGHDyoamhKwpltirby	{U2FsdGVkX19Mi9CdI6CcGBO+0WzuHW5IYJ56aJhDHas=,U2FsdGVkX1/K+aycymQgIAfIJK/NqZXC0bN4s3lV89k=}	{}	7bb2072a-e9dc-4559-9536-6ea08cf45ba9
1	U2FsdGVkX19CdYGFNLOVg6MP24fko7kZsbpXf4tFEQw=	U2FsdGVkX1+5XRN5NXwFEMNq0sL/uRoW00N7shqkwzpF2FeudT7x9IH8I3s90IwIEmL2cPyFwCMTgGDaYGsRQQ==	{U2FsdGVkX19BA9DnM7SIgUbYltEg4+C4WE1wUVjQwbE=,U2FsdGVkX1+a7jmvgLGhGtfpzImJA9mV76GEzh1SDBo=}	{"{\\"name\\":\\"IMG_20231214_214347.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/16vYU71MXUCxDbLosDtGL15ugn6PYo8l2/view?usp=drivesdk\\"}"}	4683da57-fc13-49ea-aef4-2524fd711300
1	U2FsdGVkX19/RSEkBZwuBtYfPN6RzGjvE1G3mWG676P+V/QwEoNwSdjE7oa49AwZ	U2FsdGVkX19YuUUOeSvRFDYc3o68ldoe7wzNMQXzxdQWu4FwDObOdif6RmRbagwjBk3v1KNsqGLjSRaMzKp8gAyybtVX11q3Jtgz0hilxr6oZACuBy6P37c9Qcj3sCyp2kGc8sReFX5Pel5knNAxJ3gJO+eiRnzEn0cp9LTUVRo6XEWYREZXO7AOXiwYevMHd7aYnl6CfcgjGz8KOMry0w==	{U2FsdGVkX18lCfHNJRzNP44kFVmaYFsvJjjBSn4Iorc=,U2FsdGVkX18vo55Kr7nktvCYjHqpU9d/TwZbZagp5Pw=,U2FsdGVkX1/OeMW4ZPZ1e+iRbcOCmdTLofaGrLtBjX4=}	{}	16f73802-9313-4f0f-b588-fdb483697379
1	U2FsdGVkX1992O1OMVXOq8xPvPfQIKI+s6mJHgIpKLQe8WZqAN/qy4R0VekLvgoO	U2FsdGVkX1/XS995hpyux+ca9eIY4coTLGkrySB1FXwwIg2Ni3osjnYD5aet+6K+uThfOzLY7vJuPuh9ixgmhkyKvu32dhxW4155BFy7cZpKZCT+RhEDtrSTWKLCgnLNTZiSuycQ92Wu88AQRbW96ZgcoYX18Y0MPXRq2dfUdDXgEC/grVIa9IIigs0oRmuaisnnB6IzEuwrB/sPiRBKcQ==	{U2FsdGVkX19HeZ5gMVFHirfJoee7f+KCeBGOTgHy1tI=,U2FsdGVkX1+iXm1VGgJT3zut64MoudqyLQM89Y3EXRo=}	{}	1cd1ff67-5d2b-4ee6-a38c-c8d51c5d35f9
12	U2FsdGVkX1/WsCfXhd+ynFqhjFXHTVob0I+c6BTYp1Y=	U2FsdGVkX1/gIOcpMaZED3lS+D4NC8IX3XBGxe8ZbUg9bDlOsGYd3Vd9qFwWZ95s+YQbzDzFeMkOoxj2+7dMY3TeGdWchN80Zltdj8nJK5N/0ydauKcNRoGDbHOloyWFpyhV0KKGVmu6s3DZBvfdQQ==	{U2FsdGVkX18Wn/uOKLyuBGVy693uy0nMvv909ngZoPQ=}	{}	51ce1b29-2e69-46c9-b5e0-45915ded0173
1	U2FsdGVkX18v8BGT+YZKlIu0iO8bsbnXPbo1Ik53LscVLGukfWdz+t5FhdUMKWcj	U2FsdGVkX1/BaPY6Sqa77br5RYruH9w3vXd9/ki3cQxnn1hQZwz/71FTH9ViDDzmcBeBvD13Ar6mSxm3LOcRPQ==	{U2FsdGVkX18/x96+M78c7C6c1DRC1gVr6+AbJZxjcrc=,U2FsdGVkX1+HSTBmstfh1cVYtqj8JA4ifqOPL2tTj/k=,U2FsdGVkX1/+aXABvnXFurHfhSVmMpqdea18GcpfXTw=}	{}	87fc3f88-5e5b-4aab-8b82-6e9351a99073
12	U2FsdGVkX1/NF4SZrLw5p8m8tcmpjqsUYKud9jTqIH8=	U2FsdGVkX1/mlE5XJy0Rt1O0V/Cq4SBgU7nZtoSA/4I=	{U2FsdGVkX1/+bixj2ji1lP6y44RuqQBFqpKz6VeksyI=}	{}	c68e8059-7262-45d6-93c6-cbb8b645f36a
1	U2FsdGVkX18JLH5xTawRYKZ7B39vybv5JDgX86aGmd6ayS4d9TfFpAyl//YROmHt	U2FsdGVkX18pKcE+j8S30UNKiV1VkPYnnwrqmW87Txs=	{U2FsdGVkX19fifLq2AmwuOSwQJfbuLw7dkzJHnmLU5U=,U2FsdGVkX18ypqHqcQQMNxh7fRUEPOf3bxrkyjOx7EA=,U2FsdGVkX18TAUtcblswNCNMU8jSjqk/OJUnnPqwttM=}	{"{\\"name\\":\\"IMG_20231215_224035.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1_QfYvx11ogLXi7JtoqV2-yFeRIhIHfCd/view?usp=drivesdk\\"}"}	0e6aa612-d17b-48de-9ccc-743a527f25ae
1	U2FsdGVkX18Jf+GTxgU6l94aKhsI62gE2P/zeSt75L/qr9Ags7TiUdmUiI+WKf24WtCKXKNbo7dFtn8CQ0dSow==	U2FsdGVkX188yUQvJ2W4zIEcG3vBcB5yB4XMEjmjcEmKJCCl4+J0gKtS2VvSO8zT2e2YdEO99+bMs9jhLcMcqzAFbI4wiDwsvTMYWuasWWEcgVAyL4CpNIwtPm6G/l0kh+hJH9qjS3dhbCu1JHfvMw==	{U2FsdGVkX18DdVQq9FKK9IJthKHL8OtIrNxdBueZIbE=,U2FsdGVkX1/wgWP7ZlueGP+oIj+Amdfb7JXIwOoaV0o=}	{}	5f9d94d9-685a-485c-af41-cbe099824696
1	U2FsdGVkX1/UxCvf4mYMGabG5eQCWOFt2QEy9I7Y3BT5W7rleqA3pWmVEQsFuqZr	U2FsdGVkX18m3nX77kLpJ4IRZBtyINM9n1fp3bAcg9yxgvdXd7FVgXsIq5zm9kt6nXjUh1MNSROw/tS5qZBe9Q==	{U2FsdGVkX1+9QawefkdAD/zIzCEar/MElVurg8Nmysw=}	{}	31763f6f-c6b2-47f6-b4f4-c7d16e963326
1	U2FsdGVkX19Sh/iJ5ljf/bzCFef9ALPqc+gOIS6jD1o=	U2FsdGVkX18g3fVGuOTHa1rhN7rUl2wblszbN6u9bs8=	{U2FsdGVkX19rp6KJ13Eqp7gSGK5l8ODez+3T5+ELxuU=,U2FsdGVkX1/cQ9+cAZeIfaOvxvcfEBTMCAVUMmR6TcM=}	{}	2bbb922a-f08c-41d6-b7d2-7170ee4ff43a
1	U2FsdGVkX1/lFF5SniMfPoQXUuSIAK5nsgTg2fK7b9oRG5I132bKXB1NDvWy5bhK	U2FsdGVkX1+DCVf+gIdxkhOtSqY5SYZ3gcpHeb9DEO8=	{U2FsdGVkX1/nD65UfB+SVzSbNm1RlKi2cLXBWGuRoPY=}	{"{\\"name\\":\\"IMG_20231219_000007_677.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/17M3hyJXpQXJIGw7YcwpJ2o3FoxH-CsTb/view?usp=drivesdk\\"}"}	876b0742-9e90-42e3-a0d6-14a8ca81b8fd
1	U2FsdGVkX1+jaO98PWO3pQ3Z642XzHPE9gcPx/xsgAAODgYvKg7l3VL0TKD9md9s	U2FsdGVkX1+3NeMbnkiBooBozETVVtnw2DK7DPK2vTOY9UzR5ED5FvpmEofKLGF3od5U8Vmr6/La81ayq1xXAjS2kWio4wvNcHbRX2nQmzk=	{U2FsdGVkX1+QTxdP8d9xaQ2g0i1YfSF9y/Kl5naHrkc=}	{}	e1d60492-3906-4e6e-a342-319586f90c14
1	U2FsdGVkX19BIp9xgO5i88s1XOMuV8CADDJ4n/TobRdpczEWRjmvBlYJtwqqcFQJ	U2FsdGVkX1+urjTK9um/+MIZIDQNmnmj+svAVU1eDFY=	{U2FsdGVkX1/OLHKGcDgBgwacQc3F4WCWYUfSpht0I5c=,U2FsdGVkX1+MQ1LR/CEVRbwEa9RAz1lTAJTCQNlWLkU=}	{}	31549678-506f-485e-ad6b-851f82d6c566
1	U2FsdGVkX1/wyC4XIoLkAwAoIA5RuLHx2w3rc8vPyVA=	U2FsdGVkX19pgegkq1PjuQpKg8uN/Ii0XKCmYlKf8VfXfxQ2oEzVLPEmqTNKVbP0KH4BzPPtvphMZlgVmwBuBCi/hl+RBc98DDYO/jFubig=	{U2FsdGVkX1/WJfPLIeSDaZF3hCj3SH6KtKaXEmzS+7Q=,U2FsdGVkX1++2tKWmaDIgRrgK8RXCsa/3SUsThWy2qI=,U2FsdGVkX19SJLoHe+xjEx/x94600Mdcn9ke+Ij3tPo=}	{}	c86439d3-71d3-415b-aa83-4be5bf4011d7
1	U2FsdGVkX1/rKP9MCtWodBcD4oEcMBB/1lqxRJSNV5MdWcFHcvlK7ypL7DSXN/25	U2FsdGVkX1+tc2aeL8auS9S61tc52ERbwCvvkFFlLBFtvaZrkG4tl3jJwORin0Ty	{U2FsdGVkX18xqA4caEdXdwPwmsiw23w9LjiPA/OEQ4U=}	{}	7275c0c5-da7c-4aa9-baf4-a8f9a91cb18a
12	U2FsdGVkX18VZm4/ijbsqH+h1tyvMTkGfPCaciJ/UuI=	U2FsdGVkX182+rarve6GiEWl4uAoeI1waRM4x+MGy+4/QLN+I2PjPlUjG80ERI6Dtnb74ertZja/L49XiH8bP4WqCd1NOOmYt+9Y4SVNttY4/8+Tvef7azGc3kW1TaNAZdFYHGF/cs6kDu+0wF6AxRsTMC1BjtyJb8s7dP+1cBnIIdnGJSoyyoENtJmY+/JN9LNYDsRR6rNkjwpGbVgUwP6nQa5DrJ+g3s4MCnMYod5+FO4fk0T62e0P+Q0zXl1fDYct2JtnYF2Ysd3TFKYq3GfHA4XUZQ5NCbTjs+5hQdGH7oTmKzhPYfUZSRoUXch4wMr1fSgy2ewdSYjl6OmLREbH/WnWTqFqg3U6t2plukIBc2YRb8xciVNpK75pQ7AQcQ0Xc+wChIcIeerrZpfej+RC9DeEMfdZRdldM6HKINaUP+CK2vXN2vMC8jMvfSKkSROJtTD3P9OeXgecy0A7tnGdhcf9JFZT2wID2DBLQazz4XxjBa/oglWiCX/BjMbzydfRYGWBcNfKL2f8D+oC943eRtduLnqURQKJ/wgMGkgIpzosRT2yHyZ/yBmb6R9ou9q6h/2yNNqVpS042zTHL5iPaI9/dns3ycd2WBGE4xXAD9toEDQ2lZ2UTEnQjlqw/2ZV/PXdGBNKH+p3WrNpqPhwrvMDEH6o29Rl8rkbSvLoaeENGjeOVAfmc84Kz6syDkki954UaJKzWqSQD4gaGLe8aLg7SQYGeww6R/agSINuuFZctq25fQhbynt/jK6i1sciIuLOxjSHaeEK69WUrJkzgfqGKUmi6NOC2a8sTLtt0xrisEtcgyEHf+ZSl5TyH1n118R/ujGqUKIGnJgPvDPbNVLn9MHSqGNMvwPRlVfIS7DOrxtLuL+Cw+M6quc93bSRj26PA639OVhYKxFbnrB9MVQb9mBp/zorLWQtsyd57xlBm9FVZksYzbgYFVrF	{U2FsdGVkX19l1EuwxSxICgCrIPS/kuAzAtxzVnEBr/4=}	{}	7d29983b-8af0-4c32-b2c5-5adea7515ec7
1	U2FsdGVkX1/MDdPP8GXm7Gy69ncqyaa8pdi9aX+lBME=	U2FsdGVkX1/udG+Xh2k+ccDotquw9yMsWepbRu1a/mmxeFKIyzHNVHmVUTjxCKz1WCUayBSf7GRboKR/ywUbmJ3r5QLYMI8t7RqOho3lfxDyZHHCfHDPXk7cpcjdDag1tQnVEqTYx7mGs5Xcp8m/EdAAizAUMZxiT98c7+WezkyuutS2R1VFaepxBp5mBUaB4doiseKQG8pozMccOxe3AdaybgCc8GS/LDU4Z2SEJGw=	{U2FsdGVkX1/zRI2iapXuYA1oy4LEKKGVXiZWNWu+wEk=,U2FsdGVkX19GL0FGZqo2hRIV/U/N/8BLLHa0a3qoik8=}	{}	1113a5a1-cab2-437b-b0d6-7c7ef2fbad5e
12	U2FsdGVkX18koHFi4ZJjkmuUG2EkMzo2fuzd03zMUKQ=	U2FsdGVkX197YCY+0RqCMrvsGvwfuakseBp0SPviy9aP31MZ/J08REi8hlsdcNb5qj3O188KXvFAcv/NDmnd/bRfW0Kg9HnTzGPiy9RWMMWXAGriCNJNUI/Kdw/lWm949PgBbFJWUgTECf1KwlmPVwQLY+COp6xk9hL+1OkGPfo=	{U2FsdGVkX19od9krWJEVYNNVK2imWTMCkvREx864kYc=}	{}	41a73527-bd56-4975-8825-8cf58d927c5f
1	U2FsdGVkX18o2jP2tu/CigiNCxzG9WPAa8yozZUL6R/XafiAyBjIRw/XuR8+Xmtg	U2FsdGVkX18sKNvzl/thDdoi1G+N67ceTXDzKr1kw1KA11oIsGgx9tRVG3tRS3gQ	{U2FsdGVkX1/4XDiGukUiS4yjWZBV633qCMGombW0itk=}	{}	40cc1182-b053-41b5-ab1d-596fbf361bad
1	U2FsdGVkX18HUAi8y/t4wArKvtrnwJNAEx8fu/oL3KW52sYKNYerH02Sg8I+la67	U2FsdGVkX1+fHYM5lJ2LC/GFo505nH2HSX4ebe2m8MfVDnl2wNguSDzEho+hQGZ7onB2lmpMHqa/RU3kGZ6dqY7YGhfyL3yxvstMrO9DwKk=	{U2FsdGVkX19fpIBaMm3fl325ZBl+Ly4SMlzCtE3XXjg=,U2FsdGVkX180dc5GM1vb7pFk6C/+i/Pd8or0bQse5Y4=}	{}	84b5cf02-f4c1-47aa-a10f-e9c8ae9aadd1
12	U2FsdGVkX19eg5C1CwkDKHhkVUQCLYM78IwiFH/hn48=	U2FsdGVkX18+DEjQYH2lmugdHwp61/Xe1/1dTyADF0IX4aJgPgPKEgsCwB+X8ikD6rdnF4ElE82IeEv8rYvschlRpbgYLv2JWuQaJfoVZfbYEFcpV5uXZieaCBW3fdIjJ5gIuMrLXeptBFAqp4iraGZpqUb1ehlr0QLZUOvoLFT4XlyJhL+BqSjfR1MvmINPy1HlZkhZb2MqbMhpeaRNGHMtQOWPxecrVV7pJCiAJkUUg8EwhUlRsTlnwB7nLkTvWr619PkepuM+D3yyjx7/DtRMCARfhc9UbWcIZEI+bPqReEDK3uYimno4tcuyZ9EaVFgKzcetkOrII8eMprgDn2mFFdQRWaAEXzkRK0fsklgThmCtgxRTREe7nCaoHaLlOMvvobJtf5ipw7srxx0SCTjqlJAAHSKLoeYeGrIWQoS5TU+zgCym7K4q1yWLUty0BeXnSiiF0dcTCDtEpRoL0Q==	{U2FsdGVkX18rtKSiqCfK1PGHNT9mSXzagzdPImXcRUI=}	{}	f289b978-f081-4c93-8017-aa57bf5cccc3
12	U2FsdGVkX193UGj6I4Lmyw8RQWbWs9gAYmUCC68AVnw=	U2FsdGVkX1+RHBmikxrKfxpT7AVlqdILWF3RAnHW+q9/DW/uThhZsvx8t2ejLErM	{U2FsdGVkX198B9qHWwpkY79jwqMPwZbTXtgElDjKnNA=}	{}	91998e20-944f-4caa-932e-60b15c41eb06
2	U2FsdGVkX1+HBtpoc5F1rq2ACVWgzOApuHiu8ZxjSdg=	U2FsdGVkX18u1775DQ0+taSnpELoqSBd8D2K10kIZg6I9DUzK9JmjY6H7rkkQaguPI14xJtEDHTYodQ9nPQ/RIRvLq48FR516JJ8//iJZMHoXwN7Saa1O1lWjIM+rsKgDe2SjMAae/TeISi7IXw8cYrsq6jAJ2qhcMceg+Ud5aYFMCM1XE2ZIgG5e2MDQwMG0jTE/8sntbhhX9FJCV3AKg==	{U2FsdGVkX1+r28JZd1qK4OYjVKMGCxlHc/P+ZgtdhmI=}	{}	eceefeb8-e38a-445e-a0af-66942a3f060e
12	U2FsdGVkX1+5UQmRRKxoLwaDSAteCkWTzfsrHDhgzmo=	U2FsdGVkX18X0zISuGDzDU/FjcKi66OUQ2ioJCAN1xsDrtvimMmnMBcp02YuCm2nngmh8VVm/POprHlwqiZ+z3bRac8J1TTxlY53nYoyXnj34vQ76nxfeHrUC9mrIb3NKTaI5EY0LSoMdVIINxLco2PFQw1/qyh/w86vbXt9DN+k1FkNNCgLIhkeBJCiqtyd0VYAwKy/3LJ5JM3W9FUqO50lbxLPPh5faaghumXHDrwEh9KNYxwN/nulDHPfN7qIu20P1sgzg9q/uXfOKnNSn0Fa1IshEUT114paROmjjdEpETqRCHkTeRjuZy7jUaLf4fk6JZTLcvEB+YKs5ajGZ/hZ7FyNAqEMyt6P7nqyMRP2gCmyTuwkZGlJgkRD/NaCEXlZqtOKEswg1PNyOy4iV8mN+vHvTyKYbc+sdZ7jxYKlh3oFZ3DigDhmNMNkYZxR1M37MB7JzrHtxwvIy0UI98kEc1dXhB2WZ5Zmjob7s9iECB6L1ZVJhzoTSnPbscAA07buJkjsD1utqPc9e8f2+CTlUtTOAbBN9iLv0PLi/V3XqAqRGxhX1qmtb8/EUBD+EzCOW5DPlXxMto2fg4mdZtAhr7LrUZFyICTOMYfBjpzYKjOmTrlhO9mEG4mQNNP/1+OmUXfQd+rTxsiRTqYeMgYiRFtZydV3rLSwnEiIRfdYMpG7aU/ek7HrVSEp1RDf+fH+OgXAWVzV96dbL7TGLBxp5NKosH14CqrQIrpQmtVnJSRuyB9MReF7rMyD3atlS2j3ATLAIyMpcW2mXwYYkD9ELW/YMN4f6oF1Nd+pS2PH1ps9tJNghh/sPeujTup+zhr/bnLWYVGdvQ6JRU0fWJ/5ROd56GshCzDG0OTxSuwGUmlcayjUZGHdcCnn4xcg7ZV8xrBVXMGcmZof2c0TjmdCKhjz9Q54hiJ/ffSD7WZXb+748Tvg1hCBapiTpV9V1SjyDxYecWCuYGL8uRBaGq+oz2kadoi69wPJWGkerEVwqSnk67Y2R8A5J/OuH1uS4YfrVnASALn+dFGGbSGUhAaTCd7oJuKSWRzNfzn/EhUkgfQYp7mC3J8dk8S7If1lAinJWrF+36gKqgJ38wgV6Ad3e5nh1E509yVi02kZ3+44sJIOJXEwn7/fcc8H6CE5pF3vh33Ls5A306ChY3/NQqcRQzDFl64BD6hsJbHUDweH8rQThueCHeZaT3rCaRKIBfRcXpg5tf47jvYvOMPif435EL1JvpHTdF2VOvXqoysHLvL9ouYiF13bWqRlAgk7gRFV/2ccHqmJ1jum0ZqDsKzUREDgzXE89BurR5ECamel0oVhLZJfrDQUzlqn7uLZ	{U2FsdGVkX189D743ZCwqBMUXSFys77nEqUlbaKJ4R8g=}	{}	82edbdb3-be44-4d10-855f-e3f0226318a5
12	U2FsdGVkX19tPh7cbNYJUKcOHSP+54+jfbGcd9t4IK7HniHUw0wNHjVM65TGu1TqO4rYZ83KsLQNpGIfXF8PtA==	U2FsdGVkX18z/5X8CH73Jw0+Q3ht+lR8pX49eyEZaDz0gP6qmnUmS6tKqtfhvfgqfZ+R6eoQAqKHnCM8w5YT7g==	{U2FsdGVkX18SIl7x98rQMgZ5dEPVWLR7+RyCWCNwW8E=}	{}	065baa9a-72a4-413d-ac45-7baceb08a622
12	U2FsdGVkX1974xRzK1xKAE70igWc8DWOUS4Mx8RNGsc=	U2FsdGVkX1/8TzaBxiNGld9q++5Z/3wJjCow0FPNzq48HI31k2Krd1yUQMu7i6OCoZAv2nU24b9/7lpRh5uFrEdgvtNDL/rzLppQL0tGI9X8TDDx2mms090GURXbcRs2xGbwYbD2rvAWzqTQbVphJxLw36YV3L9TkI3AqV/xd84=	{U2FsdGVkX18OxY/OL2WEDSarVBYRm1InPPgOsJjXh+w=}	{}	ebfe97be-c867-4f6f-915e-ec63cdfa3580
12	U2FsdGVkX1+cnpN+QOaugtAJ7Q0FbfXW4V5KivBZuvY=	U2FsdGVkX1/ZPQZCm/gt4m5bEmltsLeuNXpjP4Y/6kvjFgyC98hVOrPjh3QlpUvpzn1RSkkz897cuwqUlYrt3YCrmvNz7J3CF9FQ1AX2Z6Qa/2EvxfF/9Z8NCqIKNlNuzXI3ATK/a7BGqv39ysjUD8bYf7r6Xjf05yiYe0E7nK73re/kC4/8BE5xjGlIEp1q7e42XvQVUDi6XezbQbhIzts5EI53HNFxEUtXc7E0+Xs=	{U2FsdGVkX19Tt7wWR6nqAHGjGknjEf4RuqnzlHBXCFk=}	{}	330b6cf2-238c-48af-8b2b-375c01a49c20
12	U2FsdGVkX194IZOiKgtwUAfhNvkwFFf5A5C8/PwpekY=	U2FsdGVkX19Ld5R29Zv0uWHHERshBQHB8TRz06pNlkpPbHbHrxoQcRus/WlJ2+m9	{U2FsdGVkX1+aA1OPdMmfgMax9PiyE+JXgmwkJ1UFIeU=}	{}	ca192431-2ffe-49c8-8d5d-df70d69d32b4
12	U2FsdGVkX1/tZ4eKzrTCcv1LEu4lEtelcD3FXClWAgs=	U2FsdGVkX18CG1siBhWOpPFko37En7lxXi8ph90A+eXVAT0Si6ihHIfXK9GS6ImoOwXIGt0Y/DPeWXOCEjMhQQ==	{U2FsdGVkX1+48bAvzJMWFgWfQaEFfP7eckOZBiBuBu8=}	{}	36d03998-efe1-4740-83be-6a033e6fb31e
1	U2FsdGVkX1/qRhEEzVJvp13XPbP3Vrg7IcBd0vhcgPLPRLaRIfoHyxuIXH+EXO3I	U2FsdGVkX19kuX3K7mVM0vCPxqdb9LBW0NdSUOVuzZLn41pDe912tFQ0RA96aE67	{U2FsdGVkX1/TOZjN+dQ6wAEr0TWtbm9TKUtoVQ+typc=,U2FsdGVkX18KTMiQ9bblNNZZlGBbesgR78JH2rfdpJU=,U2FsdGVkX19yYx2snieps0p7C4zJ3X7nVjsmErQSLaU=}	{}	0728d980-6c7d-49aa-a53c-b114647fdc54
1	U2FsdGVkX18Oy7DdGiupmqEVPWt3s6r/quK+s7EFQaaoF8AWENYNfHiJejSUU9ZY	U2FsdGVkX1+xXMBEdpEI0s5B3wHfgIEYK+sJAfQ8QdgNlWCz4l/rI6uuAP04Gtnmz2Z4IzgjIH306bOEturQQw==	{U2FsdGVkX1/xqvK9J+zgr3l2Syp4lkvUDW4hxOW2FL0=,U2FsdGVkX1/+P0aUC1pyr3zZ6pF1RuSvBqiRA+83I6g=,U2FsdGVkX1/jKjPV6ZMb7RLrlYnoBYMXZxODDeeNsGA=}	{}	c957a47c-4d99-4d44-80df-73d3331c9ac6
1	U2FsdGVkX19DF35GyhJtCxL1xzDw1aQEQDWBIe2qNN8=	U2FsdGVkX18b3XqDoho0c18Xk/FmatRsq7CAVzhj2/Q1iJpEpxdh/aKsoKDJZH7G8HAONa4YKqqAo0RsxqBEegGpNv5Wx28JUDjomqNAmUFUsezGpVgwt/2rnbK+XFLbpEdvdKjYzKIfF/sF0yHzL1OB0bZh5zfJ0wBPMhXCiSMu/XJoXjLUZvk21w7DGXTj	{U2FsdGVkX18XA5wgrGmjARLLUtl/g6hvogCuAjpCCYA=}	{}	5e3eb547-1344-44ac-9c0e-c20948cb7c2f
1	U2FsdGVkX19OGdDrtiplahoq8DFPL1epm0HtqVWzM0I=	U2FsdGVkX18NzdqTxso7ZWdV3+P0UADT6m8HsD1+jb+OU7SKhbnpubzne5iv6S3olNOxggSa7Q/CsRb0FqthxQ==	{U2FsdGVkX18FR1hPoUbygqCTRTe96lpuXzi1fbZFbsw=,U2FsdGVkX19/ynl3c0UvB4z4lbn1cNulR+tKiQFz/DY=,U2FsdGVkX18FfCXhIdlTGUs6WpwkPr8pLSEFWFFLxOw=,U2FsdGVkX18gKjPdJKgbkhUsdPVvIDAwH18JmZsgJsU=}	{}	9af956eb-c6e3-4039-aa61-958fd581159b
1	U2FsdGVkX196Dj9yp0NcY+Wh5IWrVqt5nc9rywxX9YY=	U2FsdGVkX1+EqGkNNPTOoCnH6ghyMWV/LyC4g0oVC+qRgxFWyERXAfQreoJ24z+C	{U2FsdGVkX1/nFfc5VVB+Qg0MnqR/Kbt2bshe7D3BGGI=}	{}	31c95ce1-db61-4626-a082-b829d48a835b
1	U2FsdGVkX199hg5PFr2S2X9k87v0rOZTvlgCfD0EU1Q=	U2FsdGVkX1+qpsBCmY5DG9IPVB7eLYqPMgIVB3olYQbgmIAwoDonzlBKMkxbEP3CduvYfT/elN0+TD0di5qS/g==	{U2FsdGVkX1928IZsq3p8LltwH0D9FGUmzihYapGP+xE=}	{}	14e37169-d10f-4c37-b286-b9a8edf08e74
1	U2FsdGVkX1+VqjFkhgqJZXulATLyOusu19ukc8/wu50=	U2FsdGVkX18nrB+l9KD0KrMkn79yA8I9XlHcUBUX0SBx7b/h9+lgpo3Ki75lRzCPtihsGaoMhA1e7HYCnmLxzr3ypA4GFofPrGI1olEapKe0CL15FuudZsQ5x1mHArrS8H+r+MXSz/f2YD5eIV+U/v6GfB5Ss+npsIFjBPlr6iMwPQOhOILvwkZnSH1j6ePh15/a7W5pLV9aFEHI//c8PUS7FSjMDcBOBTGAjcAWtjKKwHOD2qNkZ20seF7F8JoQ	{U2FsdGVkX1856vcuGLxOUESLV/yiySEbpb2bmLcoqC8=,U2FsdGVkX18ZlMYyKMeBoYIjZuwPOQJeEvYiw5Sgw9k=}	{}	9c7a4cc7-2a62-41d8-a057-279506ae9fa2
1	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	{U2FsdGVkX1+J6pSONqmb1RXQnGfm2mjHah6n5Smk5CM=}	{}	54ab8422-28ac-458a-beba-c4fc5cdcebad
1	U2FsdGVkX1+QvHS3s2UZuZJ+Fx4BK76qCuajyVdjdqI=	U2FsdGVkX18xNuf9kljcXAlZwYqhM2hzuFiELTWlWwHEgy7zOdRua/M24Jxdb2m4pWM0FrXMVxbgcnQK8lkdNw==	{U2FsdGVkX1/Ri49KRexWHm7CAqZZeuW3izDSl3/SYb4=}	{}	86a7743e-e14f-4887-a3a2-09dc4be7b564
1	U2FsdGVkX19DPNPFvi7k59I8h48BjrLjrIfiu6znWGE=	U2FsdGVkX1/0aDRPZaRS98083F6TgWWo/l2e5oCUAusNVm4D2QkAvQO13y86Fvj81Q6LT9mW2qUSAmWvsmytklMfuumIOmyAmG9D25NvpCs=	{U2FsdGVkX1/BbwEEhY1KpUT2On2gBIYuO2DB5fdP90w=}	{"{\\"name\\":\\"IMG_20240120_190713.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1Y-kCW3SzjQ-7dyVa-qxWa6LXBEAAAuIm/view?usp=drivesdk\\"}"}	48a54e38-745c-48ac-ad4b-2f659c765f0f
1	U2FsdGVkX18n0fR5HIYa143B/Y0HxEARz7CUbg6/PO0=	U2FsdGVkX1/moAUmAGgXDkgeprmg2b1TqYf/MI+Aagk=	{U2FsdGVkX18A8srQmr0Qkm+4Rwkt4awLERw9o9xDVnQ=}	{"{\\"name\\":\\"IMG_20240121_132233.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1nfnQ3eiNaRpNSmBOqKtjsoS63SXVZRrV/view?usp=drivesdk\\"}"}	4b771887-9d98-4212-9692-0d3168db61d7
1	U2FsdGVkX19gzXxl/naDiBQZVxC/qVq+/rHlffKBi8E=	U2FsdGVkX1+eeCah6pfluRlfaLUtJeBHDJbFGRXF41Ijs1qFW+1UdoSsBNKchCWi698vdTuSmRmJusbjlbuZLMxRU62OraQ3dT2XFiFlKlSbEYJX/+4ffswlN+dqOzlwD0xsAIpeXAApAm02pO5Wqg==	{U2FsdGVkX1+ezRiCCSOehoYfIkbuD23q9vx56jaOxic=}	{}	efb8f60d-26f6-4535-8e2b-33d46ef948cf
1	U2FsdGVkX18vkDSyieDPYEkUoirJcjPQRUu/mOXxiYA=	U2FsdGVkX193dVSoDLYq5Bc4r6SJBtyXSgFkCMvJ0pJozxd8xI6Hza2tDSuJJaUTWV3vI608O5gWM8lQqz/3lQ==	{U2FsdGVkX188+DHd5oo7D8Z5hfwh9yuL5HrOM435IzY=}	{}	193cd8ce-0895-4db4-81b8-ddb9b0bca42a
1	U2FsdGVkX19Ar1QDyrvLY0fui1W44NMG+/hOmrcBbdU=	U2FsdGVkX1+31trPj7SHBAf6Pzhqrj9BM6nnXUNgtqTlBCOUIIcU6mAsFZWaOnXxfiAOg9RprgLUUgk6Z5rSv55Gu4NLQMN15dlFRlTobCc5ukYKkIXHjdlLol+uEeOMFZPernzHwHo5sbr+lXMCQw==	{U2FsdGVkX19INbMWwTq4z3DDdWB777aXfhN8x3b8Ry8=}	{}	c95155ab-9eb6-47c6-afd1-0c455b2c7939
1	U2FsdGVkX1+1tRdKxkA27b/Zh08cbfX0h6ivKJBqk0g=	U2FsdGVkX18uFtKQppYl4C0eOk3BYZJRgKVwQXMftGRsvyO87f+dyCqWo2Kv+UfIVRsSTwia6HeBf+gZg7wT+iNAIUBtB4xm4AK1ERiRvcY=	{U2FsdGVkX1+U87xSQa00gJVOcSXHS0RJG1gvvQAHS34=}	{}	29f623f5-ec4b-4a48-a99c-eabcef7477e0
12	U2FsdGVkX19nZ8rXGwtwyqMWxFsyC6WOyworqh/sA2U=	U2FsdGVkX188Du/n+KMBKuOKZkaokEb72NqjKDp9PiLqeFnuFZmIZ9X+7cv4MZc5	{U2FsdGVkX1+lV+h9+ySgXxfCqE+yFB7WrnwaoIiDqvU=}	{}	2431b2a1-ce65-4b2e-9b10-8959a2c88daf
1	U2FsdGVkX1/QQIbtCHU+cxuDYlB3U66EzyiXukfYcTo+QcsF95nCzr5o0JTUnMpD	U2FsdGVkX1+rcHDqQBNiuNPttekZbC5wVB/0lEPj6v9NPy+GUngYlzLYJ0IwwEEHpssQn+AZe/Sre+yK7K31Wa19gk5XM6lP0o4vtC+DrGnCSnk4t+k83/ro48UJK8/5RZrAALOc2ZeXdTrPOjifIwR6hxlWbZ1PrTxwerUCaRM=	{U2FsdGVkX1/7VhcJUAj39S0pQ+823C+2L8sDMRFN7kY=}	{}	fc6e5ae6-90b5-45e2-b14d-6e6bee8bfed5
2	U2FsdGVkX1+fKZG7gfDg2G/sV0S19POWMle642plSHw6vnFlvAzC0RXpTpYmYKFy	U2FsdGVkX1902+Gc3CVa1ig0jVOjifkM1eNQ+hV0Kcm6LDUkqtVxhrSm+7NMrgSL	{U2FsdGVkX18kD/N4ohcCiRi1BYuPbQ6OpXC+rLvxsgE=,U2FsdGVkX19sbRb1MixIceVxmuHBEgcNCAWiUOAQ5NM=}	{}	361963a9-eeed-4df5-86ff-e4b126d862e9
1	U2FsdGVkX1/zQOjkEpSwZz99i0GMt3YNeCXV+orWR98=	U2FsdGVkX19DMjZfE0UtO57MPLtFj+oiQHSsW5l1b2BRrQmv+2p3yWxmQtamf+XyGvRbldQN8qaf1wusJTIxpQ==	{U2FsdGVkX18i/aFESH37KjCBYU0VmL40O2CTh+0vBrg=}	{}	2a8fa1e6-4729-4aab-bc7a-1c38fcdf8277
1	U2FsdGVkX18n29IAlrJVWV2rHFyICInhdSyT7wNKE0Y=	U2FsdGVkX19fLTvRSRA0cFI0LFB+3hhHGbmNCcpe/0k=	{U2FsdGVkX1/ykajit/ibIgpYLfzXpKJIOS5QKMYgkRA=}	{}	ed420bc9-aa5b-4b7d-b34d-46be57409956
1	U2FsdGVkX1+IbQtCZq3+KF4rcU8d9pndBu+kccr8cjM=	U2FsdGVkX196hqu04tia9X0U/SXzeN0gwSe+WeBb+khElooQA+AX3VQe7Rk1QW0k	{U2FsdGVkX1/O3QN4Ox5JaPcMTz13W+ub7OhoHpdcBjg=}	{}	05c022b2-5098-4716-963a-c1c191f51a86
1	U2FsdGVkX19AyV1Z6fDQL7ccdn0V3cCTspbnOjLB9Ss=	U2FsdGVkX18NpbUeQ2w8pTrFJNwjN0sh37XmOib3Er+cNqk0gbYd9SawRniwkKmE	{U2FsdGVkX19dl5JzMBusuA26Mv/tuDM+/WsMGaNUFMU=,U2FsdGVkX189etc2K+xI4LOfh7hUDjdW8FGelr3qEfw=}	{}	39e6ae53-b2a2-4069-b498-fd4848de3b40
1	U2FsdGVkX195MZuUBKDTmlBmAhxRksCCZsUssXROJpKjqgqeSpiStUxzioY2lpg6	U2FsdGVkX1+mAZNjFRwWykoa1chQGg79+SQ+SplkHr0VOeChdCZ7X4CW2vX7u6kpFMSvgSANgO6hSzjfblbU7g==	{U2FsdGVkX185zh1GrJ7zsnzJL3WLvISfrRa6dkICVDE=}	{}	21b7489d-ecd3-4bfb-88cd-91680a8b967a
1	U2FsdGVkX19YFBbEP1hVhudmSP/I/7lP5uTxcMwyqmA=	U2FsdGVkX1/3MCLC/5chHZn62BNMdrG2+p+ka8GZEQUtWpPLvIDWPiTlARMhR5azRVLBo/5fHdlAHV0px2GiIrg2Ft8X27Rd42BBYhg9Jf4=	{U2FsdGVkX19qp/TggBS5ifvZ6e8CA2tAvXQcrm0R/Pg=,U2FsdGVkX18g8nl4FrkCu6M7nAb5LsJaYT81hqr7hwQ=}	{}	4c8140ee-ac49-4c08-b80f-6ef02677f175
1	U2FsdGVkX1+9noUsyiRxFLZ/FdyQS/hIk9JLz9piazM=	U2FsdGVkX19Ck+V7wRLgpLqkaa09FCGq/5xycUF5+AA=	{U2FsdGVkX1+6JK5HpEeRFHAK5eWgCgf2cZm8pTDCRCE=,U2FsdGVkX1/n/BGPIQSDJM2zXITHO1JcWKicUeYUfvU=}	{}	bcfad76b-1cab-41af-8b6c-ee3dea520d61
1	U2FsdGVkX1+wagy4mgS6Tqo4viv9w9P/VPYE8i9Wkt0=	U2FsdGVkX19F2mglPOk7WKcHpRCJH4GSzoV1zQnHB0df9NqtCmUnzKVhK3n+kpEJ	{U2FsdGVkX1/3YKOOBK5n17ciCQLokoG3vcWsPG9ssAE=}	{}	32f13061-e002-4e97-a963-913fc80f6395
1	U2FsdGVkX19H0N6R24J+Eey9Bw8rKdJRzWwCOPonBg4Ettdx5MFYDRcc3RxQIVCp	U2FsdGVkX19hWMIbmO0YOR5JE+FTgrYS2iH2E7F/WezmSl9ho09NyE2WJ9tHQdQmPXrZazCDWcVNLDmvX+G1ew==	{U2FsdGVkX1/S7Id3Zvwffs88bv53O4TbahYxNV5sSLE=,U2FsdGVkX1/rEVGDCK3oBrY9+R1cwzEsI3SK8HRofxQ=}	{}	e7d13925-853f-42bb-bb70-63afc8efed0f
1	U2FsdGVkX194rM6zujPbQat3V00N/siSZ67EkBAcb2+tRRtzs7aDj2NAKYa8U9t8	U2FsdGVkX18fn58G4baBCVfPNIvw1arGVEPrRc3eEE8=	{U2FsdGVkX19SDLhHSGU8v9W/oz6rQkld3h0G0wt4AvU=}	{"{\\"name\\":\\"IMG-20240206-WA0008.jpg\\",\\"url\\":\\"https://drive.google.com/file/d/1Rjr2OrWdDrb6NIFbAolVXm1VE2mstuou/view?usp=drivesdk\\"}"}	91481660-d460-4a45-805e-33d819d7b0af
1	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	{U2FsdGVkX19ssCyNvUWMhZV2H7xbDJYejpa7YkwMJhU=,U2FsdGVkX1/+xwhDba0bfGt6d8gvp3CinCJs/js+n5w=}	{}	d93fcee1-9669-440f-b68d-a1c228a3f2ac
1	U2FsdGVkX1+M6VOJy2pdTUKZWY4tKzk9XUStQ1yf4WE=	U2FsdGVkX18f/zPXMVKxS1ZYOZk/UhT0vc4/CUqyd1SioZPNwPuTRyMCuuhwo/BTTK76ZYBHuKOzj5dkid+RAf6wizK+YYsMr7b0xipcenoWpZfx1CNkfIoE9bzlenqR47pbzIv1HdpcalPBzWxFOKxM2GFciDl/Xy3ArqUa4usiIOs9B39aa81fL16jG1VS	{U2FsdGVkX18QbHd7sTojmMDp4z9kMmzd5a9nPJSViPo=}	{}	10f9f5ba-0370-4ef3-a6a5-78ce7dc694b7
1	U2FsdGVkX19Iv5wLl/dzCxlwLHdI7NINxUuY1DrRJ6M=	U2FsdGVkX19ATAMO2/gW9BoG5esACXpDi3GXm3M9OM1HLCAQI7DgHmj8NQ1RqIXa/ZIjO9tPK43+P2TAi9n+t+MQnvbsSl03+dnBzCx3NmPrjQ5uWurA991MlIcJhed6	{U2FsdGVkX1/pZhGVBtDSuHkMx6irKxDPdrF7Wtgu3w0=}	{}	499cdafc-9743-4572-9bd1-aa0cea23b2d3
1	U2FsdGVkX18JMSmhIaW7RKvmYP3HC61NGabbX34d/x8=	U2FsdGVkX19MaNgEdh+Q1uJbCwXiOmV1WZdFAk31QkGIvI46JDJjqgxuHEDPkBNjILm55K51MZA68THjeNe4Lg==	{U2FsdGVkX1/djkUr2KqGVrZ+KcvdKNJtF6gy36p3RTc=}	{}	038449bc-62d4-4f89-b5b4-220573f98c54
12	U2FsdGVkX1+EUKLqOGGehbHiH2/rteT51C7TEw5Qe0c=	U2FsdGVkX18mJM++Gdf66dBoTFbRr3Unv3WSS40P1RFVFi3T+hGT8W7wAAT6G8MOjmEJciKJgZFkYKcWq4IitQ==	{U2FsdGVkX19r829Ax2TfH0S44yzPGGDY6Gjs7EWEddU=}	{}	a874b382-77b6-4eb9-9524-2d39eb7413c5
14	U2FsdGVkX19nlmS984xuRLcczyLR4v+tnSGUMJ2iWjM=	U2FsdGVkX1+6a2gLX9tIlYYoZrWC99jmsusCf32+EPc=	{U2FsdGVkX19b0duo4wjFDI8gYJpof7IO2dKd5f7w8f8=,U2FsdGVkX1/S1n+VgU2CGk3hqpsAbMDkyHrdqEmRteU=}	{}	19d7b4e0-f380-444f-a331-dc73e3270f05
1	U2FsdGVkX1++BBEMLIYRZOMGVvRSBT8ByI13GKG4KBg=	U2FsdGVkX18kaEdt0ly6YCGjPd9moPV8IH5gcIYguZqc5OuiFfoRG9xyxlEy0y9wMLofbpnvecNcvfrh4mfojw==	{U2FsdGVkX1+wcRu0S2ZCSw51J4pFAJb+82tGei2cnTw=}	{}	3ec16be4-cf81-4f69-829b-e3511e024211
1	U2FsdGVkX1/wTkuQFJcCfSiFKA+Dj5bREU56gNTXyDY=	U2FsdGVkX1+gJToxU6HGmvpbNdwRqTFoXZFrN1WeLmi/maEoTq8Z5eC6g7HolXfM	{U2FsdGVkX19s3CbxtLeiXW8iqdeiB91mb++ZkXsvpqM=,U2FsdGVkX1/u4II3PKqQe40LiU+Rgwgznu+5E+ST8y0=}	{}	d89b8e0f-b189-41d2-b02f-0b5ef924e83b
1	U2FsdGVkX1+6ac1DXkaJGV9eFBGh+trknml1WGKIq14=	U2FsdGVkX18yEGcpgOAoeAGQKQHaBf4q9ARfKCAs+3j3MQtje73cQH1/7/FTPb0ouSHuzJ6eVpVaQMMAKaeg9NHSt5Soic0/VSsrhA+05cRkNiIpFWcVMP7XX8eiU1bNsa4F0qAzumWJx4/KyXc0q2aEfr1zZ6AeRzGhdlnXu9SX1zhwnygscTN3dKiY0PoM85Vp7sXMRNTCR9jQWrrdQvDoeyKN4nZfkFtswY+Do4QupGQ3afD/RXQYztqwcOsp	{U2FsdGVkX1/GSaFv8tVH319W2vacTbU/amwqSnBQNDs=,U2FsdGVkX1/4k0Ui2eP2V8925kf+A3nZLGBuRLO6LNU=}	{}	74e07ff0-4d73-4a90-b1e8-19fbaf7fa94e
1	U2FsdGVkX19jf7adqcDVj9zQfprY7K+w3Qpzz8ZmzYg=	U2FsdGVkX1+GmwcQa9TOzyGZMqwGQaOn5SgN827uc+J2SRgo0sxEs+T3U1yEOarUj1mjgtCbEfiYZrKcRBB8Kw==	{U2FsdGVkX1+63vaRGaR4WoFPCj0thcE06BSxiAqKPKo=}	{}	6c78a686-192a-44ef-9005-8bd65dbc32e5
1	U2FsdGVkX1/yIJWQe4n80FRFG+BXVvUXqqpnKMWs370kJjkj7CH6DP3d67ZFKNGS	U2FsdGVkX19O3RvTo4RX3yj6WLKh/cczhjr9NB3YogeCiEcwzIWwds2IsPrJz+y4DUtiMX4En4cVccwCg3SIgQRW4bmg/a+KGhz/MVqADBWL8nXm/8Pd9PQGYUJKM18J	{U2FsdGVkX1+IQkywcY2j+29MoAWrS+sNbRkEpnyRKt8=}	{}	bb7455ea-46fa-443b-81dd-59497bae872c
1	U2FsdGVkX1/dkk/CxjWpW/M0jkaDsllDRxSg2W/ft+Q=	U2FsdGVkX19tak7I6fbTiI5g0Y1xeOrL0h7Hx7Qd2b4poMmVmuXzL8mClK02OpetZavj1bHvCggHTorONjK5rg==	{U2FsdGVkX1/s/Y1d7o/reuGhR6r76tTzQhKSl3n/VVk=}	{}	df97acd6-a278-4e0d-b525-84f40efc8576
1	U2FsdGVkX1+bM9e7+PIkEwsldgTag5GReIvqVLq8pyuUU825a92Y2nUUKvb5txoa	U2FsdGVkX19sJp6wTlZs8lLSJIEbrv6dkjD9+L9/qtusDFqg89yYolWjaumbBT7/8Mk3dkBoiC5dzyqV8jugWxys72KJ+HbSHdSGd1j3nSI=	{U2FsdGVkX1/zq/i/FH84OyeRCTxpQUb5mzqImCzMS5o=}	{}	585a0dd9-7db8-4d4c-ac75-5a178c1a0017
1	U2FsdGVkX1+uqrh/EX/lAFwdS2sViyG5Hfm3tGKCD4Y=	U2FsdGVkX18VOBm3soIkEIrQVBjT4YZFa5NegK+323DlMQ1YlXgriakqc1gIj2Mw	{U2FsdGVkX19PGWnSHYOk1rSnQQvmaA4N+nMwgc9/6bI=}	{}	cf2d9809-01f6-4dbc-90b9-4074e72d5c65
1	U2FsdGVkX1/0M7W72ZvRms2Ba0tDvwvUwwOVkbrUIvg=	U2FsdGVkX18aeqkWM2wnYnNRjSxq06vobGCNHeKYlyoUlSdpXxZplSZUX2LKK1qr7aAdYsF/odvJxWcNB4dEdj2Ljm95zaxOUbQs1iDs31R0zD6zGQv5mt7X/fLqBwrtcb+LUOuPAhhyj3gHBLQ6Gw==	{U2FsdGVkX1+gpKRXQsc7wCMQqh143IAlFGMpkx6yZGU=,U2FsdGVkX1/uXqXK2Lo6SsuPcrQcHpz0LcvLuyz1mZo=}	{}	8ac1a3a3-bf1d-4134-a659-62aa684fb756
1	U2FsdGVkX1+TpD0HT5TRaYwPiomyrnPTg4fOJsA3Y40K5grT/PVYF4/oUKqW/Gyq	U2FsdGVkX1/e5D9WmiFtIjfyF0pCj90sMqzqDM147imDUUZHbvAXetnxMukh8xi27BTng7nSmokHPOKvoliOQA50Ak7A2GFkr6iaPNm1JM+WbTdv5Z7chyvf+8GnKbhd	{U2FsdGVkX1+3aV9ekT8CpezZrVecbcVTvr1/slnKZks=,U2FsdGVkX19sp9P2uZr4qGvDVbNThqkXLGVBMsw32ig=}	{}	f95221da-1347-4dde-80d5-8ffd90389ff0
1	U2FsdGVkX1+ndrzAYLVI3mYdZbERv2/bp4UDQJE9RVU=	U2FsdGVkX18EAvIm4oyyMG8uRaE1oYq0QWbxW8ot/3AU2d4AdKmKzgX5OD+ZNnpk3TTLEDEYpUMFxAyDGehDrA==	{U2FsdGVkX19m9+PtnGXch8Z6/5Mttu8CHxSxnlA70Ro=}	{}	b61dc198-03cd-4301-acf3-d6cc2d193feb
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, foldername, backupmegaacc, quota) FROM stdin;
1	kondashivaradhan007@gmail.com		kondashivaradhan007@gmail.com	1024.00
2	blazingbane007@gmail.com		kondashivaradhan007@gmail.com	1024.00
12	prashanthirayala29@gmail.com		kondashivaradhan007@gmail.com	1024.00
14	bantulaxmi73@gmail.com		kondashivaradhan007@gmail.com	1024.00
17	kshivaradhan@gmail.com		kondashivaradhan007@gmail.com	1024.00
18	test@gmail.com		kondashivaradhan007@gmail.com	1024.00
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 206, true);


--
-- Name: userrecords userrecords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrecords
    ADD CONSTRAINT userrecords_pkey PRIMARY KEY (ruid);


--
-- Name: userrecords userrecords_ruid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrecords
    ADD CONSTRAINT userrecords_ruid_key UNIQUE (ruid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: userrecords userrecords_user_email_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrecords
    ADD CONSTRAINT userrecords_user_email_id_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

