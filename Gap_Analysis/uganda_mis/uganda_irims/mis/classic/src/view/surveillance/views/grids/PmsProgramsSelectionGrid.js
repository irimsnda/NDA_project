/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsProgramsSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsprogramsselectiongrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    headers: false,
    width: '100%',
    height: 400,
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PMS Programs',
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
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'pmsprogramstr',
                proxy: {
                    url: 'surveillance/getPmsPrograms'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name/Identity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'start_date',
        text: 'Start Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }]
});
