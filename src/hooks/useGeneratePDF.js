import React from 'react'
import pdfMake from "pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

import moment from 'moment';
import 'moment/dist/locale//pt-br';

const useGeneratePDF = async ( studentName,schoolName,title,content,reportDate ) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const docDefinition = {


        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [
            {
                text: `Relatório: ${title}`,
                fontSize: 12,
                margin: [30,20,15,40]
            }
        ],
        //left/ top/ right bottom
        content: [
            {
                text: `Aluno: ${studentName}`,
                fontSize: 12,
                margin: [15,0,0,5]
            },
            {
                text: `Escola: ${schoolName}`,
                fontSize: 9,
                margin: [15,15,0,5]
            },
            {
                text: content,
                margin: [15,0,15,40],
                alignment: 'justify',
            }
        ],

        footer: [
            {
                text: `${moment( reportDate ).format( 'LLL' )}`,
                alignment: 'right',
                fontSize: 9,
                margin: [0,10,20,0]
            }
        ]
    }


    await pdfMake.createPdf( docDefinition ).open()

}

export default useGeneratePDF