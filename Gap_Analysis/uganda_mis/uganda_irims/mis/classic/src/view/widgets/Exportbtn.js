Ext.define('Admin.view.widgets.ExportBtn', {
    extend: 'Ext.button.Button',
    xtype: 'exportbtn',
    scale: 'small',
    ui: 'soft-green',
    iconCls: 'x-fa fa-print',
    text: 'Export',
    action: 'export',
    menu: {
        xtype: 'menu',
        items: [{
            text: 'Excel',
            file_name: 'report.xlsx',
            type: 'excel07',
            action: 'exportBtnPlugin',
            iconCls: 'x-fa fa-file-excel-o'
        }, {
            text: 'CSV',
            file_name: 'report.csv',
            type: 'csv',
            action: 'exportBtnPlugin',
            iconCls: 'x-fa fa-file-text-o'
        }, {
            text: 'HTML',
            file_name: 'report.html',
            type: 'html',
            action: 'exportBtnPlugin',
            iconCls: 'x-fa fa-html5'
        }, {
            text: 'PDF',
            file_name: 'report.pdf',
            type: 'html',
            hidden: true,
            action: 'exportBtnPlugin',
            iconCls: 'x-fa fa-file-pdf-o'
        }]
    }
});
