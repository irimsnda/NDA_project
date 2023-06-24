 Ext.define('Admin.view.frontoffice.survelliance.grids.SpreadsheetPMSSampleDetails', {
 extend: 'Ext.tab.Panel',  
   scroll: true,
   controller: 'spreadsheetsurvelliancectr',
   width: '100%',
   height: Ext.Element.getViewportHeight() - 118,
   xtype: 'spreadsheetpmssampledetails',
   layout: 'fit',
   itemId: 'spreadsheetPMSProductId',
   tbar:[{
       xtype: 'hiddenfield',
       name: 'sample_id'
   }],
   items: [{
        xtype: 'form',
        layout: 'column',
        autoScroll: true,
        frame: true,
        title: 'Sample Details',
        bodyPadding: 8,
        defaultType: 'textfield',
        defaults: {
            columnWidth: 0.2,
            labelAlign: 'top',
            readOnly: true,
            margin: '0 20 20 0'
        },
        items: [
                {
                    name : 'sample_name',
                    fieldLabel: 'Sample Name'
                },
                {
                    name : 'registration_no',
                    fieldLabel: 'Registration No'
                },
                {
                    name : 'sample_code',
                    fieldLabel: 'Sample Code'
                },
                {
                    name : 'classification',
                    fieldLabel: 'Classification'
                },
                {
                    name : 'collection_date',
                    fieldLabel: 'Collection Date'
                },
                {
                    name : 'collected_samples',
                    fieldLabel: 'Collected Sample'
                },
                {
                    name : 'batch_no',
                    fieldLabel: 'Batch No'
                },
                {
                    name : 'packaging_size',
                    fieldLabel: 'Packaging Size'
                },
                {
                    name : 'packaging_unit',
                    fieldLabel: 'Packaging Unit'
                },
                {
                    name : 'manufacturer',
                    fieldLabel: 'Manufacturer'
                },
                {
                    name : 'manufacturing_date',
                    fieldLabel: 'Manufacturing Date'
                },
                {
                    name : 'expiry_date',
                    fieldLabel: 'Expiry Date'
                },
                {
                    name : 'product_storage_condition',
                    fieldLabel: 'Product Storage Condition'
                },
                {
                    name : 'site_storage_condition',
                    fieldLabel: 'Site Storage Condition'
                },
                {
                    name : 'seal_pack_condition',
                    fieldLabel: 'Seal Pack Condition'
                },
                {
                    name : 'shelf_life',
                    fieldLabel: 'shelf_life'
                },
                {
                    name : 'shelf_lifeafter_opening',
                    fieldLabel: 'Shelf Life After Opening'
                },
                {
                    name : 'remarks',
                    fieldLabel: 'Remarks'
                },
                {
                    name : 'sampling_reason',
                    fieldLabel: 'Reason for Sampling'
                },
                {
                    name : 'sample_collector',
                    fieldLabel: 'Sample Collector'
                },
                {
                    name : 'sample_application_type',
                    fieldLabel: 'Sample Application Type'
                },
                {
                    name : 'product_description',
                    fieldLabel: 'Product Description'
                }
            
        ],
    },{
        xtype: 'gridpanel',
        title: 'Ingredients',
        autoScroll: true,
        autoHeight: true,
        width: '100%',
        viewConfig: {
            deferEmptyText: false,
            emptyText: 'Nothing to display',
        },
        bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                    var store = this.getStore(),
                        grid=this.up('gridpanel'),
                        panel = grid.up('panel'),
                        sample_id = panel.down('hiddenfield[name=sample_id]').getValue();

              //pass to store
                store.getProxy().extraParams = {
                    sample_id: sample_id,
                }
            }
        }],
     
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'id',
            text: 'Ref ID',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'ingredient',
            text: 'Ingredient',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'specification',
            text: 'Specification',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'strength_txt',
            text: 'Strength',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'inclusion_reason',
            text: 'Inclusion Reason',
            flex: 1
        }]
    }]


  });