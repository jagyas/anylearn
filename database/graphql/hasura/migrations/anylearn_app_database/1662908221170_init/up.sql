SET check_function_bodies = false;
CREATE FUNCTION core.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE core.users (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE core.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 100;
ALTER SEQUENCE core.users_id_seq OWNED BY core.users.id;
ALTER TABLE ONLY core.users ALTER COLUMN id SET DEFAULT nextval('core.users_id_seq'::regclass);
ALTER TABLE ONLY core.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER set_core_users_updated_at BEFORE UPDATE ON core.users FOR EACH ROW EXECUTE PROCEDURE core.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_core_users_updated_at ON core.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
