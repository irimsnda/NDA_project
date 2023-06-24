/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.CollectionSiteSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.PremiseSelectionCmnGrid',
    controller: 'surveillancevctr',
    xtype: 'collectionsiteselectiongrid',
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green',
                'font-style': 'italic'
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'region_id'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                region_id = grid.down('hiddenfield[name=region_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                region_id:region_id
            };
        }
    }],
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'premiseregistration/getPremisesList'
                }
            },
            isLoad: true
        }
    },
    columns:[]
});
