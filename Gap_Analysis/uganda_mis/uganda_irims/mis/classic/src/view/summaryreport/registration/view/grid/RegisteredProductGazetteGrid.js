/**
 * Created by Sadam on 16/03/2021.
 */
 Ext.define('Admin.view.summaryreport.registration.grid.RegisteredProductGazetteGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'registeredProductGazetteGrid',
   
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },

    margin: 3,

    bbar: [{
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'registeredProductGazetteStr',
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var grid = this.up('grid'), 
                panelCtn = grid.up('panel'),
                formPnl = panelCtn.down('form'),
                store = this.getStore(),
                section_id = formPnl.down('combo[name=section_id]').getValue();
                device_type_id = formPnl.down('combo[name=device_type_id]').getValue(),
                product_class_category = formPnl.down('combo[name=product_class_category]').getValue(),
                classification_category = formPnl.down('combo[name=classification_category]').getValue(),
                product_type=formPnl.down('combo[name=product_type]').getValue(),

                search_string_select=formPnl.down('combo[name=search_string_select]').getValue(),
                search_string=formPnl.down('textfield[name=search_string]').getValue(),
                from_date=formPnl.down('datefield[name=from_date]').getValue(),
                to_date=formPnl.down('datefield[name=to_date]').getValue();

                store.getProxy().extraParams = {
                    section_id: section_id,
                    device_type_id: device_type_id,
                    product_class_category: product_class_category,
                    classification_category:classification_category,
                    product_type:product_type,
                    search_string_select:search_string_select,
                    search_string:search_string,
                    from_date:from_date,
                    to_date:to_date,
                };
            }
        },
        '->','->',{
          xtype: 'checkbox',
          name:'enable_grouping',
          boxLabel:'Enable Grouping',
          listeners:{
            change:function(chk,value){
                    var grid = chk.up('grid');
                    grouping = grid.getView().findFeature('grouping');
                    if(value == 1){
                        grouping.enable();
                    }
                    else{
                        grouping.disable();
                    }
                }
          }
        },
        {
            xtype:'externalExportBtn',
            text: 'Export(Grid Summary)',
            containerName: 'registeredProductGazettePnl',
            gridName: 'registeredProductGazetteGrid'             
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print(Summary)',
            iconCls: 'x-fa fa-file',
            handler: 'printProductRegGazzette',
            xFileName: 'RegisteredProductGazetteReport',
            module: 'product',
            xPrintFunc: 'getProductGridRegistrationGazette',
            xheading:'Registered Product Gazette',
            
        }
    ],

    listeners: {
        beforerender: function () {

            toastr.success('<i> about to load the registered Product Gazette</i>'/*, "registered Product Gazette about to load"*/);

            var store = this.getStore();
            store.removeAll();
            store.load();
            
        },
        afterrender:function(){
            var view = this.getView();
            var groupingFeature = view.findFeature("grouping");
            groupingFeature.enable();
        }
    },



    features: [
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Applicant: {[values.rows[0].data.applicant_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],


    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],


    export_title: 'Registered Product Gazette',
    store: 'registeredProductGazetteStr',
    
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'Reference',
            dataIndex: 'reference_no',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Brand Name',
            dataIndex: 'brand_name',
            flex: 1,
            tdCls: 'wrap-text',
        },
        {
            xtype: 'gridcolumn',
            text: 'INN Name',
            dataIndex: 'active_ingredient_name',
            flex: 1,
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Classification',
            dataIndex: 'classification',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Dosage Form',
            dataIndex: 'dosage_form',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Manufacturer',
            dataIndex: 'manufacturer',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Manufacturer Country',
            dataIndex: 'manufacturer_country',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Certificate NO',
            dataIndex: 'certificate_no',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Expiry Date',
            dataIndex: 'expiry_date',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        }
    ]
});