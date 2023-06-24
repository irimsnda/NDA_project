/**
 * Created by Kip on 5/29/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseVariationRequestsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid',
    xtype: 'premisevariationrequestsgrid',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    listeners: {
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_variation]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        winTitle: 'Amendment/Variation Request',
                        childXtype: 'applicationvariationrequestsfrm',
                        winWidth: '50%',
                        handler: 'showEditCommonParamParamWinFrm',//common view controller
                        stores: '[]'
                    },{
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_application_variationsdata',
                        storeID: 'variationrequestsabstractstr',
                        action_url: 'api/deleteCommonRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteCommonParamWidgetParam',//common view controller
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ];
            }
        }
    },
    columns: [{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: []
            }
        }
    }]
});