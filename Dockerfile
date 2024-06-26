#.Gunakan . image . node
FROM . node : 20

#-Buat.direktori-kerja
WORKDIR /app

#-Salin-package.json.dan-install-dependensi
COPY .package *. json -/
RUN.npm-install

#.Salin.sisakode.aplikasi
COPY ....

#.Ekspos.port.aplikasi
EXPOSE . 8000

#.Make.the.script .executable
RUN . chmod +x./start.sh

#.Use.the.custom .start.script
CMD . ["node", "app.js"]