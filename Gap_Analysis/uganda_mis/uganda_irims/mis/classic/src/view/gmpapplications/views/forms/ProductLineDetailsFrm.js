/**
 * Created by Kip on 12/19/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ProductLineDetailsFrm', {
    extend: 'Admin.view.gmpapplications.views.forms.ProductLineAbstractFrm',
    xtype: 'productlinedetailsfrm',
    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'combo',
                fieldLabel: 'Block',
                name: 'manufacturingsite_block_id',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'gmpapplications/getSiteBlockDetails'
                            }
                        },
                        isLoad: false
                    },
                    afterrender: function(){
                        var store=this.getStore(),
                            form=this.up('form'),
                            site_id=form.down('hiddenfield[name=manufacturing_site_id]').getValue();
                        store.load({params:{manufacturing_site_id: site_id}})
                    }
                }
            }
        );
    }
});