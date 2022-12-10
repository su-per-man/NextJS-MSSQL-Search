import sql from "mssql";
import type { NextApiRequest, NextApiResponse } from "next";

type IQuery = {
  q: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sql.connect(
    "Server=localhost;Database=Company_SumKum;User Id=suman;Password=2861070;Encrypt=false;trustServerCertificate:false"
  );
  await sql
    .query(
      `select fname,lname,sex,dno from employee where lname like '%${
        (req.query as IQuery).q
      }%'`
    )
    .then((resp) => {
      return res.status(200).send(resp.recordset);
    });
}
