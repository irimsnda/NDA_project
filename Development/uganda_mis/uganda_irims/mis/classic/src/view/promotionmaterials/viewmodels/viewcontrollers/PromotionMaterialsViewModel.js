Ext.define('Admin.view.promotionmaterials.viewmodels.PromotionMaterialsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promotionmaterialsviewmodel',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PremiseRegistrationVm',
            autoLoad: true
        }
        */
    },

    data: {
		
        atBeginning: true,
        atEnd: false,
        atBeginningApproval: true,
        atEndApproval: false,
		readOnly:false,
		isReadOnly:false
    }
});