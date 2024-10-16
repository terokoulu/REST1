CREATE DATABASE urheilijayhdistys;
USE urheilijayhdistys;

CREATE TABLE urheilijat (
	etunimi VARCHAR(20),
	sukunimi VARCHAR(40),
	kutsumanimi VARCHAR(20),
	syntymavuosi DATE,
	paino DOUBLE,
	kuva_url VARCHAR(300),
	laji VARCHAR(30),
	saavutukset VARCHAR(150)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON urheilijat TO 'kt'@'localhost';


INSERT INTO urheilijat (etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_url, laji, saavutukset) 
VALUES 
    ('Patrik', 'Laine', 'Pate', '1998-04-19', 98, 'https://ratings-images-prod.pulse.ea.com/NHL25/portraits/p11720.png?im=FaceCrop,padding=0.7,width=256,height=256', 'Jääkiekko', 'U20 Mestaruus'),
    ('Esa', 'Tikkanen', 'Tiki', '1965-01-25', 95, 'https://im.mtvuutiset.fi/image/8949722/landscape16_9/998/561/bae353e0301baeb5406bbeec83b57945/oa/gettyimages-618577150.jpg', 'Jääkiekko', '5x Stanley Cup Mestaruus'),
    ('Jari', 'Litmanen', 'Litti', '1971-02-20', 80, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Litmanen_jari.jpg', 'Jalkapallo', 'Vuoden urheilija 1995');