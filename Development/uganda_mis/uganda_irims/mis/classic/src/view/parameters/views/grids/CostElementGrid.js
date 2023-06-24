Ext.define('Admin.view.parameters.views.grids.CostElementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.costelementgrid',
    header: false,
    scroll: true,
    autoHeight: true,
    width: '100%',
    controller: 'parametervctr',
    height: Ext.Element.getViewportHeight() - 116,
    viewConfig: {
        deferEmptyText: false,
        emptyText: "No Records found",
        style:{
            'text-align':'center'
        }
    },
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
  //  tbar: [],
 //   bbar: [],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    } ,{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Fee Type: {[values.rows[0].data.feetype]} [{rows.length}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [
    {
            xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        width: 200,
        tdCls: 'wrap'
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'feetype',
        text: 'Fee Type',
        width: 200,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'irembo_productname',
        text: 'Irembo Product Name',
        width: 200,
        tdCls: 'wrap',
        renderer: function (value, metaData, record) {
            var irembo_feescode_id = record.get('irembo_feescode_id');
            console.log(irembo_feescode_id);
            if (irembo_feescode_id < 1  || irembo_feescode_id == 'undefined') {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Not Configured";
            }
            else{
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'irembo_productcode',
        text: 'Irembo Product Code',
        width: 200,
        tdCls: 'wrap',
        renderer: function (value, metaData,record) {
            var irembo_feescode_id = record.get('irembo_feescode_id'); console.log(irembo_feescode_id);
            if (irembo_feescode_id < 1 || irembo_feescode_id == 'undefined') {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Not Configured";
            }
            else{
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'category',
        text: 'Category',
        name: 'category',
        width: 200,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'sub_category',
        text: 'Sub Category',
        width: 200,
        tdCls: 'wrap'
    },
     
    {
        xtype: 'gridcolumn',
        dataIndex: 'element',
        text: 'Cost Element',
        width: 200,
        tdCls: 'wrap'
    },  
    {
        xtype: 'gridcolumn',
        dataIndex: 'cost_type',
        hidden: true,
        text: 'Application Fee Type',
        width: 200,
        tdCls: 'wrap'
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'cost',
        text: 'Cost',
        width: 200,
        tdCls: 'wrap'
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Currency',
        width: 200,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'formula',
        text: 'Is Formula',
        width: 100,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }
            else{
                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'formula_rate',
        text: 'Formular Rate(%)',
        width: 200,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_amount',
        text: 'Irembo Product Amount',
        width: 200,
        tdCls: 'wrap'
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            ui: 'gray',
            iconCls: 'x-fa fa-th-list',
            textAlign: 'left',
            xtype: 'splitbutton',
            menu: {
                xtype: 'menu',
                items: []
            }
        }


    }
    ]

});
