/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ProductLineRecommendationFrm', {
    extend: 'Admin.view.gmpapplications.views.forms.ProductLineAbstractFrm',
    xtype: 'productlinerecommendationfrm',

    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'hiddenfield',
                name: 'inspection_stage',
                value: 1
            },  {
                xtype: 'combo',
                fieldLabel: 'TC Recommendation',
                name: 'prodline_tcmeetingstatus_id',
                store: 'gmpproductlinestatusstr',
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            },{
                xtype: 'combo',
                fieldLabel: 'DG Recommendation',
                name: 'prodline_dgstatus_id',
                store: 'gmpproductlinestatusstr',
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            },{
                xtype: 'combo',
                fieldLabel: 'Status',
                name: 'product_line_status_id',
                store: 'gmpproductlinerecommendationstr',
                forceSelection: true,
                allowBlank: true,
                hidden: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            }
        );
    }
});