const db = require('../db/database');

exports.getConsultations = (req, res) => {
    const userRole = req.user.role; // Obtém o papel do usuário

    db.all(`SELECT * FROM consultations`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Filtra as consultas com base no papel do usuário
        const visibleConsultations = rows.filter(consultation => {
            // Aqui você pode definir suas regras de visualização
            if (userRole === 'admin') {
                return true; // Admin pode ver todas as consultas
            }
            return consultation.userId === req.user.id; // User pode ver apenas suas próprias consultas
        });

        res.json(visibleConsultations);
    });
};

exports.createConsultation = (req, res) => {
    const { userId, date, doctor, specialty, status } = req.body;
    db.run(`INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
        [userId, date, doctor, specialty, status],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
};