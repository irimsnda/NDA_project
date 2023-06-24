/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.SampleSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'sampleselectiongrid',
    height: 550,
    autoScroll: true,
    autoHeight: true,
    frame: true,
    headers: false,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var store=this.getStore(),
                grid = this.up('grid'),
                section_id=grid.down('hiddenfield[name=section_id]').getValue();
            store.getProxy().extraParams={
                section_id: section_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    plugins: [
            {
                ptype: 'filterfield'
            }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 100,
                storeId: 'sampleselectionstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'productregistration/getRegisteredProductsAppsDetails',
                    reader: {
                        type: 'json',
                        rootProperty: 'results',
                        totalProperty: 'totals'
                    }
                }
                
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name',
        flex: 1,
        filter: {
                    xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1, filter: {
                    xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'Packaging Material & Seal',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        flex: 1, filter: {
                    xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'Packaging Unit',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'shelf_life',
        text: 'Shelf Life',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'storage_condition',
        text: 'Storage Conditions',
        flex: 1
    }
    ]
});
